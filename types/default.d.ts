import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import type { ComponentType, SVGProps } from 'react';

declare global {
	// theme
	type ThemeProvider = ThemeProviderProps;
	type ThemeTransition = {
		isDarkMode: boolean;
		isMounted: boolean;
		hasUserInteracted: boolean;
		buttonRef: RefObject<HTMLButtonElement | null>;
		resolvedTheme: string | undefined;
		changeTheme: () => void;
	};
	type ThemeValue = 'light' | 'dark';

	// media queries
	type Breakpoints = {
		breakpoint: string;
		setBreakpoint: (
			value: ((prevState: string) => string) | string,
		) => void;
	};

	// location
	type LocationMap = {
		mouseEntered: boolean;
		viewState: ViewState;
		isLoaded: boolean;
		hasError: boolean;
		canZoomIn: boolean;
		canZoomOut: boolean;
		mapRef: RefObject<MapRef>;
		handleZoom: (direction: 'in' | 'out') => void;
		handleMove: (event: ViewStateChangeEvent) => void;
		handleLoad: () => void;
		handleError: () => void;
		handleMouseEnter: () => void;
		handleMouseLeave: () => void;
	};

	// fonts
	type NextFont = NextFontWithVariable;
	type NextVariable = `--${string}`;
	type NextSubset = 'latin' | 'cyrillic' | 'latin-ext';

	// filters
	export type FilterType = 'all' | 'about' | 'projects' | 'blog';

	// stack
	export type Stack = {
		icon: ComponentType<SVGProps<SVGSVGElement>>;
		title: string;
	};
	export type StackProps = {
		className?: string;
	};
}
