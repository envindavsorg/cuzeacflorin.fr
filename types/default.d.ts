import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import type React from 'react';

declare global {
	// next-themes
	type NextFont = NextFontWithVariable;
	type ThemeProvider = ThemeProviderProps;

	// bento filters
	export type FilterType = 'all' | 'about' | 'projects' | 'media';

	// motion
	export type MotionButton = React.ComponentType<
		Omit<MotionComponentProps<ButtonProps>, 'children'> & {
			children?: React.ReactNode | MotionValueNumber | MotionValueString;
		}
	>;
}
