import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import type React from 'react';
import { lazy, Suspense } from 'react';
import { Sparkles } from '@/components/animation/Sparkles';
import { Toaster } from '@/components/ui/Sonner';
import { fonts } from '@/fonts/fonts';
import { cn } from '@/lib/utils';
import { ComposeProviders, type Provider } from '@/providers/compose';
import ThemeProvider from '@/providers/theme/Provider';
import { defaultDescription, generateMetadata } from '@/resources/meta';
import { PROFILE_CONFIG } from '@/resources/profile';
import './globals.css';

const Analytics = lazy(() =>
	import('@vercel/analytics/react').then((module) => ({
		default: module.Analytics,
	}))
);

const SpeedInsights = lazy(() =>
	import('@vercel/speed-insights/react').then((module) => ({
		default: module.SpeedInsights,
	}))
);

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
			<body className="relative select-none bg-background py-15 font-geist-mono tracking-tight antialiased">
				<AppProviders>
					{children}
					<Sparkles density={150} />
					<Toaster position="bottom-right" richColors />
				</AppProviders>

				<Suspense fallback={null}>
					{process.env.NODE_ENV === 'production' && (
						<>
							<Analytics debug={false} mode={'production'} />
							<SpeedInsights debug={false} />
						</>
					)}
				</Suspense>
			</body>
		</html>
	</ViewTransitions>
);

export default RootLayout;
