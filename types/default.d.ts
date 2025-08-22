import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import type { ThemeProviderProps } from 'next-themes/dist/types';

declare global {
	// theme
	type ThemeProvider = ThemeProviderProps;
	// fonts
	type NextFont = NextFontWithVariable;
	// filters
	export type FilterType = 'all' | 'about' | 'projects' | 'blog';
}
