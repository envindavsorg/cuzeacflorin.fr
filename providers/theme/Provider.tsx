'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({ children, ...props }: ThemeProvider) => (
	<NextThemesProvider
		attribute="class"
		defaultTheme="light"
		disableTransitionOnChange
		enableSystem={false}
		{...props}
	>
		{children}
	</NextThemesProvider>
);

export default ThemeProvider;
