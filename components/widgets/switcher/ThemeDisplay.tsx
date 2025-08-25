'use client';

import type React from 'react';
import { memo } from 'react';

type ThemeDisplayProps = {
	isMounted: boolean;
	resolvedTheme: string | undefined;
};

const THEME_CONFIG = {
	light: {
		mode: 'Sombre',
		phrase: 'il va faire nuit !',
	},
	dark: {
		mode: 'Clair',
		phrase: 'il va faire jour !',
	},
	fallback: {
		mode: 'Mode ?',
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
			<div className="flex flex-col items-center justify-center gap-y-3 md:items-start md:gap-y-0.5 lg:items-center lg:gap-y-3">
				<h3 className="font-archivo-black font-bold text-4xl tracking-wide lg:text-5xl">
					{mode}
				</h3>
				<p className="text-base text-theme uppercase max-md:hidden lg:text-lg">
					{phrase}
				</p>
			</div>
		);
	}
);

ThemeDisplay.displayName = 'ThemeDisplay';
