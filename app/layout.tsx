import './globals.css';
import './preflight.css';

import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import type React from 'react';
import { Analytics } from '@/components/analytics/Analytics';
import { Sparkles } from '@/components/animation/Sparkles';
import { Header } from '@/components/navigation/Header';
import { Toaster } from '@/components/ui/Sonner';
import { fonts } from '@/fonts/fonts';
import { cn } from '@/lib/utils';
import { ComposeProviders, type Provider } from '@/providers/compose';
import ThemeProvider from '@/providers/theme/Provider';
import { generateMetadata } from '@/resources/meta';

export const metadata: Metadata = generateMetadata();

export const viewport: Viewport = {
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'hsl(0, 0%, 98%)' },
		{ media: '(prefers-color-scheme: dark)', color: 'hsl(0, 0%, 0%)' },
	],
	colorScheme: 'dark light',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
};

const AppProviders: Provider = ComposeProviders(ThemeProvider);

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
	<ViewTransitions>
		<html
			className={cn(
				'scrollbar-hide h-full antialiased',
				fonts.sans.variable,
				fonts.mono.variable
			)}
			dir="ltr"
			lang="fr"
			suppressHydrationWarning
		>
			<Header />
			<body className="container bg-background font-sans tracking-tight antialiased">
				<AppProviders>
					<main className="relative flex min-h-screen flex-col max-sm:pt-12">
						{children}
					</main>
					<Sparkles density={150} />
					<Toaster position="bottom-right" richColors />
				</AppProviders>
			</body>

			<Analytics />
		</html>
	</ViewTransitions>
);

export default RootLayout;
