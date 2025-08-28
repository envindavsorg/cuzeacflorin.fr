import type React from 'react';
import { lazy, Suspense } from 'react';
import { fonts } from '@/fonts/fonts';
import { ComposeProviders, type Provider } from '@/providers/compose';
import ThemeProvider from '@/providers/theme/Provider';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/Sonner';
import { cn } from '@/lib/utils';
import { generateMetadata } from '@/resources/meta';

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

const Sparkles = lazy(() =>
	import('@/components/animation/Sparkles').then((module) => ({
		default: module.Sparkles,
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
		<body className="relative select-none bg-theme-background font-geist-mono tracking-tight antialiased">
			<AppProviders>
				{children}
				<Suspense fallback={null}>
					<Toaster position="bottom-right" richColors />
					<Sparkles density={150} />
				</Suspense>
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
);

export default RootLayout;
