'use client';

import { CircleHalfIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { META_THEME_COLORS } from '@/config/site';
import useMetaColor from '@/hooks/use-meta-color';
import { soundManager } from '@/lib/sound-manager';

export const ToggleTheme = (): React.JSX.Element => {
	const { resolvedTheme, setTheme } = useTheme();
	const { setMetaColor } = useMetaColor();

	const switchTheme = useCallback(() => {
		soundManager.playThemeSound();
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
		setMetaColor(
			resolvedTheme === 'dark'
				? META_THEME_COLORS.light
				: META_THEME_COLORS.dark
		);
	}, [resolvedTheme, setTheme, setMetaColor]);

	return (
		<Button
			className="border dark:inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/15 dark:border-0"
			onClick={() => {
				if (!document.startViewTransition) {
					switchTheme();
				}
				document.startViewTransition(switchTheme);
			}}
			size="icon"
			variant="outline"
		>
			<CircleHalfIcon className="hidden rotate-180 [html.dark_&]:block" />
			<CircleHalfIcon className="hidden [html.light_&]:block" />
			<span className="sr-only">Changer de thème</span>
		</Button>
	);
};
