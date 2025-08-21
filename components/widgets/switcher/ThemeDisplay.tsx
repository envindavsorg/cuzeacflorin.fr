'use client';

import type React from 'react';
import { memo } from 'react';

type ThemeDisplayProps = {
	isMounted: boolean;
	resolvedTheme: string | undefined;
};

const THEME_CONFIG = {
	light: {
		mode: 'Clair',
		phrase: 'lampe de bureau IKEA 💡',
	},
	dark: {
		mode: 'Sombre',
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
			if (!isMounted) {
				return THEME_CONFIG.fallback;
			}
			return resolvedTheme === 'dark' ? THEME_CONFIG.dark : THEME_CONFIG.light;
		};

		const { mode, phrase } = getThemeConfig();

		return (
			<div className="flex flex-col items-center justify-center gap-y-2">
				<h3 className="text-center font-bold font-pixelify-sans text-3xl text-theme">
					{mode}
				</h3>
				<p className="text-center text-muted-foreground text-sm max-lg:hidden">
					{phrase}
				</p>
			</div>
		);
	}
);

ThemeDisplay.displayName = 'ThemeDisplay';
