import './globals.css';
import './preflight.css';

import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import type React from 'react';
import { Analytics } from '@/components/analytics/Analytics';
import { Sparkles } from '@/components/animation/Sparkles';
import { Footer } from '@/components/navigation/Footer';
import { BreakpointIndicator } from '@/components/ui/BreakpointIndicator';
import { Toaster } from '@/components/ui/Sonner';
import { fonts } from '@/fonts/fonts';
import { cn } from '@/lib/utils';
import { ComposeProviders, type Provider } from '@/providers/compose';
import ThemeProvider from '@/providers/theme/Provider';
import { defaultDescription, generateMetadata } from '@/resources/meta';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName, location } = PROFILE_CONFIG;

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
				fonts.mono.variable,
				fonts.pixelify.variable,
				fonts.archivo.variable
			)}
			dir="ltr"
			lang="fr"
			suppressHydrationWarning
		>
			<head>
				<meta content={defaultDescription} name="description" />
				<meta content="yes" name="mobile-web-app-capable" />
				<meta content="default" name="apple-mobile-web-app-status-bar-style" />
				<meta
					content={`${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`}
					name="apple-mobile-web-app-title"
				/>
				<link href="/apple-touch-icon.png" rel="apple-touch-icon" />
				<link
					href="/apple-touch-icon.png"
					rel="apple-touch-icon"
					sizes="180x180"
				/>
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link
					crossOrigin=""
					href="https://fonts.gstatic.com"
					rel="preconnect"
				/>
				<link href="https://avatars.githubusercontent.com" rel="dns-prefetch" />
				<link href="https://api.mapbox.com" rel="dns-prefetch" />
				<link href="https://vitals.vercel-insights.com" rel="dns-prefetch" />
				<title>{`${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`}</title>
			</head>
			<body
				className={cn(
					'container relative mx-auto w-full max-w-7xl',
					'select-none bg-background font-sans tracking-tight antialiased'
				)}
			>
				<AppProviders>
					{children}
					<Footer
						city={location.city}
						firstName={firstName}
						lastName={lastName}
					/>
					<Sparkles density={150} />
					<Toaster position="bottom-right" richColors />
					<BreakpointIndicator />
				</AppProviders>
			</body>

			<Analytics />
		</html>
	</ViewTransitions>
);

export default RootLayout;
