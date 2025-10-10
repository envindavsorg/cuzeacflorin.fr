import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { logger } from '@/lib/logger';
import type { CaptureScreenshot, FilePath } from '@/types/capture';

const executablePath =
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.env.URL || 'http://localhost:1408';
const outputDir = path.join(process.cwd(), '.envindavsorg/screenshots');

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
	await fs.promises.mkdir(outputDir, { recursive: true });

	const page = await browser.newPage();

	const { width, height } = SIZE[size];
	await page.setViewport({ width, height });

	await page.goto(url, { waitUntil: 'networkidle2' });

	for (const theme of themes) {
		await page.emulateMediaFeatures([
			{
				name: 'prefers-color-scheme',
				value: theme,
			},
		]);

		const filePath = path.join(
			outputDir,
			`screenshot-${size}-${theme}.${type}`
		) as FilePath;

		await page.screenshot({
			path: filePath,
			type,
			quality: type === 'png' ? undefined : 90,
		});

		logger.debug(`✅ Screenshot saved : ${filePath}`);
	}

	await page.close();
};

const main = async (): Promise<void> => {
	const browser = await puppeteer.launch({
		executablePath,
	});

	try {
		await captureScreenshot({
			browser,
			url,
			size: 'desktop',
			themes: ['light', 'dark'],
		});

		await captureScreenshot({
			browser,
			url,
			size: 'mobile',
			themes: ['light', 'dark'],
		});

		await captureScreenshot({
			browser,
			url: `${url}/og`,
			size: 'og-image',
			themes: ['light', 'dark'],
			type: 'png',
		});

		logger.debug('✅ All screenshots captured successfully.');
	} catch (error) {
		logger.error('⛔️ Error capturing screenshots:', error);
	} finally {
		await browser.close();
	}
};

main();
