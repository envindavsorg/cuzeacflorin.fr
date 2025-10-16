import { promises } from 'node:fs';
import { join } from 'node:path';
import { green, red, yellow } from 'colorette';
import consola from 'consola';
import { type Browser, launch, type Page } from 'puppeteer-core';
import type { CaptureScreenshot, FilePath, Theme } from '@/types/capture';

const executablePath =
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.env.URL || 'http://localhost:1408';

const screenshotsDir = join(process.cwd(), 'public/meta');
const ogDir = join(process.cwd(), 'public/og');

export const SIZE = {
	desktop: {
		width: 1920,
		height: 1080,
	}, // Full HD
	mobile: {
		width: 440,
		height: 956,
	}, // iPhone 16 Pro Max
	'og-image': {
		width: 1200,
		height: 630,
	}, // Open Graph image size
} as const;

const captureScreenshot = async ({
	browser,
	url,
	size,
	themes = ['light'],
	type = 'webp',
}: CaptureScreenshot): Promise<void> => {
	const outputDir = size === 'og-image' ? ogDir : screenshotsDir;

	await promises.mkdir(outputDir, {
		recursive: true,
	});

	for (const theme of themes) {
		const page: Page = await browser.newPage();

		// set viewport size
		const { width, height } = SIZE[size];
		await page.setViewport({
			width,
			height,
		});

		// emulate dark or light mode
		await page.emulateMediaFeatures([
			{
				name: 'prefers-color-scheme',
				value: theme,
			},
		]);

		// set theme in localStorage
		// this must be done before any content is loaded to avoid a flash of incorrect theme
		await page.evaluateOnNewDocument((theme) => {
			localStorage.setItem('theme', theme);
		}, theme);

		// navigate to the page
		await page.goto(url, {
			waitUntil: 'networkidle2',
		});

		// wait for 2 seconds to ensure all fonts and images are loaded
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const fileName: string = `${size}-${theme}.${type}`;
		const path = join(outputDir, fileName) as FilePath;
		const quality = type === 'png' ? undefined : 90;

		await page.screenshot({ path, type, quality });

		const relativePath = path.replace(process.cwd(), '');

		consola.info(
			`${size === 'og-image' ? 'OG Image' : 'Screenshot'} saved : ${yellow(relativePath)}`
		);

		await page.close();
	}
};

const main = async (): Promise<void> => {
	const browser: Browser = await launch({
		executablePath,
	});

	const themes: Theme[] = ['light', 'dark'];

	try {
		await captureScreenshot({ browser, url, size: 'desktop', themes });
		await captureScreenshot({ browser, url, size: 'mobile', themes });
		await captureScreenshot({
			browser,
			url: `${url}/og`,
			size: 'og-image',
			themes: ['dark'],
			type: 'png',
		});

		consola.success(
			`All screenshots and og image ${green('captured successfully')} !`
		);
	} catch (error) {
		consola.error(`${red('Error capturing')} screenshots or og image:`, error);
	} finally {
		await browser.close();
	}
};

main();
