import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import type { ThemeProviderProps } from 'next-themes/dist/types';

declare global {
	// next-themes
	type NextFont = NextFontWithVariable;
	type ThemeProvider = ThemeProviderProps;

	// bento filters
	export type FilterType = 'all' | 'about' | 'projects' | 'media';
}
