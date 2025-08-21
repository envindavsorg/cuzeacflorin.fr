'use client';

import type React from 'react';
import { memo } from 'react';

type ThemeDisplayProps = {
	isMounted: boolean;
	resolvedTheme: string | undefined;
};

const THEME_CONFIG = {
	light: {
		mode: 'Mode clair',
		phrase: 'lampe de bureau IKEA 💡',
	},
	dark: {
		mode: 'Mode sombre',
		phrase: 'développeur à 3h du mat 🦉',
	},
	fallback: {
		mode: 'Quel mode ?',
		phrase: 'lumière ou obscurité ?',
	},
} as const;

export const ThemeDisplay = memo(
	({ isMounted, resolvedTheme }: ThemeDisplayProps): React.JSX.Element => {
		const getThemeConfig = () => {
			if (!isMounted) return THEME_CONFIG.fallback;
			return resolvedTheme === 'dark'
				? THEME_CONFIG.dark
				: THEME_CONFIG.light;
		};

		const { mode, phrase } = getThemeConfig();

		return (
			<div className="flex flex-col items-center justify-center gap-y-2">
				<h3 className="font-bold font-pixelify-sans text-theme text-xl md:text-3xl">
					{mode}
				</h3>
				<p className="text-center text-muted-foreground text-sm">
					{phrase}
				</p>
			</div>
		);
	},
);

ThemeDisplay.displayName = 'ThemeDisplay';
