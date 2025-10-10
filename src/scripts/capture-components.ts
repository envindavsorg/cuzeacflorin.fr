import fs from 'node:fs';
import path from 'node:path';
import { GifEncoder } from '@skyra/gifenc';
import { PNG } from 'pngjs';
import puppeteer, {
	type Browser,
	type ElementHandle,
	type Page,
} from 'puppeteer-core';
import { logger } from '@/lib/logger';

const executablePath =
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.URL || 'http://localhost:1408';
const outputDir = path.join(process.cwd(), 'public/images/blog');

const COMPONENTS = [
	{
		name: 'apple-hello-effect-demo',
		canReplay: true,
		duration: 5000,
	},
	{
		name: 'flip-sentences-demo',
		canReplay: true,
		duration: 10_000,
	},
	{
		name: 'theme-switcher-demo',
		canReplay: false,
	},
] as const;

const THEMES = ['light', 'dark'] as const;

type CaptureComponentOptions = {
	browser: Browser;
	componentName: string;
	theme: (typeof THEMES)[number];
	canReplay: boolean;
	duration?: number;
};

const captureGif = async (
	_page: Page,
	componentElement: ElementHandle,
	duration: number,
	outputPath: string
): Promise<void> => {
	const box = await componentElement.boundingBox();
	if (!box) {
		throw new Error('Could not get element bounding box');
	}

	const fps = 20;
	const frameInterval = 1000 / fps;
	const totalFrames = Math.ceil(duration / frameInterval);

	logger.debug(
		`📹 Recording ${totalFrames} frames at ${fps}fps for ${duration}ms...`
	);

	const encoder = new GifEncoder(Math.round(box.width), Math.round(box.height));
	const stream = fs.createWriteStream(outputPath);
	encoder.createReadStream().pipe(stream);

	encoder.start();
	encoder.setRepeat(0);
	encoder.setDelay(frameInterval);
	encoder.setQuality(20);

	for (let i = 0; i < totalFrames; i++) {
		const screenshot = (await componentElement.screenshot({
			type: 'png',
		})) as Buffer;

		const png = PNG.sync.read(screenshot);
		(encoder.addFrame as any)(png.data);

		await new Promise((resolve) => setTimeout(resolve, frameInterval));

		if ((i + 1) % 10 === 0) {
			logger.debug(`  Progress: ${i + 1}/${totalFrames} frames`);
		}
	}

	encoder.finish();

	await new Promise<void>((resolve, reject) => {
		stream.on('finish', () => resolve());
		stream.on('error', reject);
	});
};

const captureComponent = async ({
	browser,
	componentName,
	theme,
	canReplay,
	duration,
}: CaptureComponentOptions): Promise<void> => {
	const componentDir = path.join(outputDir, componentName);
	await fs.promises.mkdir(componentDir, { recursive: true });

	const page = await browser.newPage();

	await page.setViewport({ width: 1200, height: 800 });

	const slugMap: Record<string, string> = {
		'apple-hello-effect-demo': 'writing-effect-inspired-by-apple',
		'flip-sentences-demo': 'flip-sentences-component',
		'theme-switcher-demo': 'theme-switcher-component',
	};

	const blogSlug = slugMap[componentName];
	if (!blogSlug) {
		logger.warn(`⚠️  No blog slug mapping found for ${componentName}`);
		return;
	}

	const url = `${baseUrl}/blog/${blogSlug}`;

	await page.goto(url, { waitUntil: 'networkidle2' });

	await page.emulateMediaFeatures([
		{
			name: 'prefers-color-scheme',
			value: theme,
		},
	]);

	await page.waitForSelector('[role="tabpanel"][data-state="active"]', {
		timeout: 10_000,
	});

	await new Promise((resolve) => setTimeout(resolve, 2000));

	const componentElement = await page.$(
		'[data-screenshot-anchor-target-for-capture]'
	);

	if (!componentElement) {
		logger.warn(`⚠️  Component preview not found for ${componentName}`);
		await page.close();
		return;
	}

	if (canReplay && duration) {
		const buttonFound = await page.evaluate(() => {
			const preview = document.querySelector(
				'[role="tabpanel"][data-state="active"]'
			);
			if (!preview) {
				return false;
			}

			const buttons = preview.querySelectorAll('button');
			for (const btn of buttons) {
				if (btn.querySelector('svg')) {
					(btn as HTMLButtonElement).click();
					return true;
				}
			}
			return false;
		});

		if (!buttonFound) {
			logger.warn(`⚠️  Replay button not found for ${componentName}`);
			await page.close();
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 300));

		const remountedElement = await page.$(
			'[data-screenshot-anchor-target-for-capture]'
		);

		if (!remountedElement) {
			logger.warn(
				`⚠️  Component element not found after remount for ${componentName}`
			);
			await page.close();
			return;
		}

		const gifPath = path.join(componentDir, `${theme}.gif`);
		await captureGif(page, remountedElement, duration, gifPath);
		logger.debug(`✅ GIF saved: ${gifPath}`);
	} else {
		const filePath = path.join(
			componentDir,
			`${theme}.webp`
		) as `${string}.webp`;

		await componentElement.screenshot({
			path: filePath,
			type: 'webp',
			quality: 90,
		});

		logger.debug(`✅ Screenshot saved: ${filePath}`);
	}

	await page.close();
};

const main = async (): Promise<void> => {
	const browser = await puppeteer.launch({
		executablePath,
	});

	try {
		for (const component of COMPONENTS) {
			logger.debug(
				`📸 Capturing ${component.canReplay ? 'GIFs' : 'screenshots'} for ${component.name}...`
			);

			for (const theme of THEMES) {
				await captureComponent({
					browser,
					componentName: component.name,
					theme,
					canReplay: component.canReplay,
					duration: 'duration' in component ? component.duration : undefined,
				});
			}
		}

		logger.debug('✅ All component screenshots captured successfully.');
	} catch (error) {
		logger.error('⛔️ Error capturing component screenshots:', error);
	} finally {
		await browser.close();
	}
};

main();
