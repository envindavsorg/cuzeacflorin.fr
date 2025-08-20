import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

export const baseURL = 'cuzeacflorin.fr' as const;

const keywords = [
	'next.js',
	'motion',
	'react',
	'javascript',
	'typescript',
	'tailwind css',
	'front-end development',
	'web development',
	'responsive ui',
	'portfolio',
] as const;

interface MetadataOptions {
	title?: string;
	description?: string;
	image?: string;
	noIndex?: boolean;
	canonicalUrl?: string;
	tags?: string[];
	publishedTime?: string;
	modifiedTime?: string;
	type?: 'website' | 'article';
}

export const defaultDescription =
	"Florin, développeur web avec 10 ans d'expérience, passionné par la création d'applications fiables, belles et fonctionnelles. Actuellement chez WeFix.";

export const generateMetadata = (options: MetadataOptions = {}): Metadata => {
	const {
		title = `${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
		description = defaultDescription,
		image = absoluteUrl(
			`/api/og?heading=${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}&type=image&mode=dark`,
		),
		noIndex = false,
		canonicalUrl,
		tags,
		publishedTime,
		modifiedTime,
		type = 'website',
	} = options;

	return {
		title: {
			default: title,
			template: `%s | ${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
		},
		description,
		metadataBase: new URL(`https://${baseURL}`),
		applicationName: `${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
		keywords: tags ? [...keywords, ...tags] : [...keywords],
		openGraph: {
			title,
			description,
			type,
			...(type === 'article' && {
				article: {
					publishedTime,
					modifiedTime,
					authors: [
						`${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
					],
					tags,
				},
			}),
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: 'fr_FR',
			url: `https://${baseURL}`,
			siteName: `${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
		},
		alternates: {
			canonical: canonicalUrl || '/',
		},
		appleWebApp: {
			capable: true,
			statusBarStyle: 'default',
			title: 'Portfolio',
		},
		formatDetection: {
			telephone: false,
		},
		authors: [
			{
				name: `${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
				url: `https://${baseURL}`,
			},
		],
		creator: `${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
		generator: 'Next.js',
		referrer: 'origin-when-cross-origin',
		publisher: `${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
		icons: {
			icon: [
				{ url: '/favicon.ico', sizes: '32x32' },
				{ url: '/favicon-16x16.png', sizes: '16x16' },
				{ url: '/favicon-32x32.png', sizes: '32x32' },
			],
			shortcut: '/favicon.ico',
			apple: '/icon.png',
		},
		robots: {
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image],
			creator: PROFILE_CONFIG.genId,
		},
		manifest: '/site.webmanifest',
	};
};
