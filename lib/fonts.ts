import {
	Geist_Mono,
	Geist as Geist_Sans,
	Pixelify_Sans,
} from 'next/font/google';

const sans: NextFont = Geist_Sans({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const mono: NextFont = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const pixelify: NextFont = Pixelify_Sans({
	weight: ['600'],
	subsets: ['latin'],
	variable: '--font-pixelify-sans',
});

export const fonts = {
	sans,
	mono,
	pixelify,
};
