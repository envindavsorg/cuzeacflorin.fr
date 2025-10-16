/** biome-ignore-all lint/complexity/noForEach: needed for now */

'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const FaviconSwitcher = (): null => {
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		const faviconUrl =
			resolvedTheme === 'dark'
				? '/favicons/favicon-dark.ico'
				: '/favicons/favicon-light.ico';

		document
			.querySelectorAll<HTMLLinkElement>('link[rel="icon"]')
			.forEach((link) => {
				link.href = faviconUrl;
			});
	}, [resolvedTheme]);

	return null;
};
