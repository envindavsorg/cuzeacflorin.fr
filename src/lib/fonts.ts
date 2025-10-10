import { Geist_Mono, Geist as Geist_Sans } from 'next/font/google';

export const sans = Geist_Sans({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const mono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	fallback: ['Consolas', 'Monaco', 'monospace'],
});
