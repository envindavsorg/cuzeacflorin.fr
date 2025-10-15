import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
	locales: ['en', 'fr'],
	sourceLocale: 'en',
	fallbackLocales: {
		default: 'en',
	},
	catalogs: [
		{
			path: 'locales/{locale}',
			include: ['src/app/'],
		},
	],
};

export default config;
