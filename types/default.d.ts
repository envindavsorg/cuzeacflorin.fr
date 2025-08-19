import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import type { ThemeProviderProps } from 'next-themes/dist/types';

declare global {
	type NextFont = NextFontWithVariable;
	type ThemeProvider = ThemeProviderProps;

	export type FilterType = 'all' | 'about' | 'projects' | 'media';
}
