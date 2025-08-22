import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import type { ComponentType, SVGProps } from 'react';

declare global {
	// theme
	type ThemeProvider = ThemeProviderProps;
	// fonts
	type NextFont = NextFontWithVariable;
	// filters
	export type FilterType = 'all' | 'about' | 'projects' | 'blog' | 'misc';
	// stack
	export type Stack = {
		icon: ComponentType<SVGProps<SVGSVGElement>>;
		title: string;
	};
	export type StackProps = {
		className?: string;
	};
}
