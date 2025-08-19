export type PageType =
	| 'homepage'
	| 'service'
	| 'blog'
	| 'blogArticle'
	| 'about'
	| 'contact';

export interface OgImageParams {
	type?: PageType;
	title: string;
	subtitle?: string;
	image?: string;
}

export const getOgImageUrl = ({
	type = 'homepage',
	title,
	subtitle,
	image,
}: OgImageParams): string => {
	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
	const endpoint = `${baseUrl}/api/og`;

	const params = new URLSearchParams({
		type: type.toString(),
		title: title.trim(),
	});

	if (subtitle?.trim()) {
		params.append('subtitle', subtitle.trim());
	}

	if (image?.trim()) {
		params.append('image', image.trim());
	}

	return `${endpoint}?${params.toString()}`;
};

export const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) {
		return text;
	}

	return `${text.substring(0, maxLength).trim()}...`;
};

export const generateOgMetadata = ({
	title,
	description,
	ogImageParams,
}: {
	title: string;
	description: string;
	ogImageParams: OgImageParams;
}) => ({
	title,
	description,
	openGraph: {
		title,
		description,
		images: [
			{
				url: getOgImageUrl(ogImageParams),
				width: 1200,
				height: 630,
				alt: title,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		images: [getOgImageUrl(ogImageParams)],
	},
});
