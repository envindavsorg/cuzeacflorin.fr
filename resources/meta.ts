import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

export const baseURL = 'cuzeacflorin.fr' as const;

const { firstName, lastName } = PROFILE_CONFIG;

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

type MetadataOptions = {
	title?: string;
	description?: string;
	image?: string;
	noIndex?: boolean;
	canonicalUrl?: string;
	tags?: string[];
	publishedTime?: string;
	modifiedTime?: string;
	type?: 'website' | 'article';
};

export const defaultDescription =
	"Florin, développeur web avec 10 ans d'expérience, passionné par la création d'applications fiables, belles et fonctionnelles. Actuellement chez WeFix.";

export const generateMetadata = (options: MetadataOptions = {}): Metadata => {
	const {
		title = `${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
		description = defaultDescription,
		image = absoluteUrl(
			`/api/og?heading=${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}&type=image&mode=dark`
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
					authors: [`${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`],
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

export const generateStructuredData = () => {
	const currentDate = new Date().toISOString();
	const skills = [
		'HTML5',
		'CSS3',
		'Sass/SCSS',
		'JavaScript',
		'TypeScript',
		'React',
		'Next.js',
		'Vue.js',
		'Node.js',
		'Express.js',
		'Fastify',
		'MongoDB',
		'PostgreSQL',
		'Tailwind CSS',
		'Git',
		'Responsive Design',
		'UX/UI Design',
		'Web Performance Optimization',
		'RESTful APIs',
		'GraphQL',
		'Framer Motion',
		'Figma',
		'Bun',
		'npm/pnpm',
		'Docker',
		'CI/CD',
		'Testing',
		'Agile/Scrum',
	];

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': `https://${baseURL}/#person`,
				name: `${firstName} ${lastName}`,
				givenName: firstName,
				familyName: lastName,
				alternateName: PROFILE_CONFIG.genId,
				description: defaultDescription,
				email: PROFILE_CONFIG.contact.email.value,
				telephone: PROFILE_CONFIG.contact.phone.value,
				url: `https://${baseURL}`,
				image: `https://${baseURL}/avatar.webp`,
				sameAs: [PROFILE_CONFIG.linkedin.url, PROFILE_CONFIG.github.url],
				jobTitle: 'Développeur Full-Stack',
				worksFor: {
					'@type': 'Organization',
					name: PROFILE_CONFIG.work.company,
					url: PROFILE_CONFIG.work.url,
				},
				address: {
					'@type': 'PostalAddress',
					addressLocality: PROFILE_CONFIG.location.city,
					addressCountry: 'FR',
				},
				knowsAbout: skills,
				knowsLanguage: [
					{
						'@type': 'Language',
						name: 'Français',
						alternateName: 'fr',
					},
					{
						'@type': 'Language',
						name: 'English',
						alternateName: 'en',
					},
				],
			},
			{
				'@type': 'WebSite',
				'@id': `https://${baseURL}/#website`,
				url: `https://${baseURL}`,
				name: `Portfolio - ${firstName} ${lastName}`,
				description: defaultDescription,
				publisher: {
					'@id': `https://${baseURL}/#person`,
				},
				inLanguage: 'fr-FR',
				datePublished: '2024-01-01T00:00:00+00:00',
				dateModified: currentDate,
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: `https://${baseURL}/?q={search_term_string}`,
					},
					'query-input': 'required name=search_term_string',
				},
			},
			{
				'@type': 'ProfilePage',
				'@id': `https://${baseURL}/#profilepage`,
				dateCreated: '2024-01-01T00:00:00+00:00',
				dateModified: currentDate,
				mainEntity: {
					'@id': `https://${baseURL}/#person`,
				},
				description: defaultDescription,
				inLanguage: 'fr-FR',
				isPartOf: {
					'@id': `https://${baseURL}/#website`,
				},
				about: {
					'@id': `https://${baseURL}/#person`,
				},
				breadcrumb: {
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Accueil',
							item: `https://${baseURL}`,
						},
					],
				},
			},
		],
	};
};
