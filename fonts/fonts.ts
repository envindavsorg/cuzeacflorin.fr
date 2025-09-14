import {
	Archivo_Black,
	Geist_Mono,
	Geist as Geist_Sans,
	Inter_Tight as Inter_Sans,
	Pixelify_Sans,
} from 'next/font/google';

const sans = Geist_Sans({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

const mono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
	fallback: ['Consolas', 'Monaco', 'monospace'],
});

export const pixelify = Pixelify_Sans({
	weight: ['600'],
	subsets: ['latin'],
	variable: '--font-pixelify-sans',
	display: 'swap',
	preload: false,
	fallback: ['monospace'],
});

export const archivo = Archivo_Black({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-archivo-black',
	display: 'swap',
	preload: false,
	fallback: ['system-ui', 'sans-serif'],
});

export const inter = Inter_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-inter-tight',
	display: 'swap',
	preload: true,
	fallback: ['system-ui', 'sans-serif'],
});

export const fonts = {
	sans,
	mono,
	pixelify,
	archivo,
	inter,
};
