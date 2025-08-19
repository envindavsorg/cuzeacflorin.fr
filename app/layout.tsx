import type React from 'react';
import { lazy, Suspense } from 'react';
import { fonts } from '@/lib/fonts';
import { ComposeProviders, type Provider } from '@/providers/compose';
import ThemeProvider from '@/providers/theme/Provider';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { cn } from '@/lib/utils';
import { generateMetadata } from '@/resources/meta';

const Analytics = lazy(() =>
	import('@vercel/analytics/react').then((m) => ({
		default: m.Analytics,
	})),
);

const SpeedInsights = lazy(() =>
	import('@vercel/speed-insights/react').then((m) => ({
		default: m.SpeedInsights,
	})),
);

const Sparkles = lazy(() =>
	import('@/components/animation/Sparkles').then((m) => ({
		default: m.Sparkles,
	})),
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

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
	<html
		lang="fr"
		dir="ltr"
		className={cn(
			'scrollbar-hide h-full antialiased',
			fonts.sans.variable,
			fonts.mono.variable,
			fonts.pixelify.variable,
		)}
		suppressHydrationWarning
	>
		<body className="select-none bg-background font-geist-mono tracking-tight antialiased">
			<AppProviders>
				{children}
				<Suspense fallback={null}>
					<Sparkles density={150} />
				</Suspense>
			</AppProviders>

			<Suspense fallback={null}>
				{process.env.NODE_ENV === 'production' && (
					<>
						<Analytics mode={'production'} debug={false} />
						<SpeedInsights debug={false} />
					</>
				)}
			</Suspense>
		</body>
	</html>
);

export default RootLayout;
