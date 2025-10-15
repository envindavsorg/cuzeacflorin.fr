import 'server-only';

import { type I18n, type Messages, setupI18n } from '@lingui/core';
import { logger } from '@/lib/logger';
import linguiConfig from '../../lingui.config';

const { locales } = linguiConfig;
// optionally use a stricter union type
type SupportedLocales = string;

const loadCatalog = async (
	locale: SupportedLocales
): Promise<{
	[k: string]: Messages;
}> => {
	const { messages } = await import(`../../locales/${locale}.po`);
	return {
		[locale]: messages,
	};
};
const catalogs = await Promise.all(locales.map(loadCatalog));

// transform array of catalogs into a single object
export const allMessages = catalogs.reduce(
	(acc, oneCatalog) => ({ ...acc, ...oneCatalog }),
	{}
);

type AllI18nInstances = { [K in SupportedLocales]: I18n };

export const allI18nInstances: AllI18nInstances = locales.reduce(
	(acc, locale) => {
		const messages = allMessages[locale] ?? {};
		const i18n = setupI18n({
			locale,
			messages: { [locale]: messages },
		});

		return {
			...acc,
			[locale]: i18n,
		};
	},
	{}
);

export const getI18nInstance = (locale: SupportedLocales): I18n => {
	if (!allI18nInstances[locale]) {
		logger.warn(`No i18n instance found for locale "${locale}"`);
	}

	return allI18nInstances[locale]! || allI18nInstances.en!;
};
