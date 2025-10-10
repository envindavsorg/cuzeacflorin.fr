import type { Browser } from 'puppeteer-core';
import type { SIZE } from '@/scripts/capture';

export type Theme = 'light' | 'dark';

export type FilePath = `${string}.webp` | `${string}.png` | `${string}.jpeg`;

export type CaptureScreenshot = {
	browser: Browser;
	url: string;
	size: keyof typeof SIZE;
	themes?: Theme[];
	type?: 'webp' | 'png' | 'jpeg';
};
