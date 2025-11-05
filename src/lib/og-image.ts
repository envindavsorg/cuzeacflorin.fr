export type PageType =
	| 'homepage'
	| 'blog'
	| 'blogArticle'
	| 'components'
	| 'componentsArticle'
	| 'utils'
	| 'utilsArticle';

export type OgImageParams = {
	type: PageType;
	title: string;
	description: string;
};

export const getOgImageUrl = ({
	type = 'homepage',
	title,
	description,
}: OgImageParams): string => {
	const baseUrl = 'https://cuzeacflorin.fr';
	const endpoint = `${baseUrl}/api/og`;

	const params = new URLSearchParams({
		type: type.toString(),
		title: title.trim(),
	});

	if (description.trim()) {
		params.append('subtitle', description.trim());
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
