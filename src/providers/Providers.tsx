'use client';

import { Provider as JotaiProvider } from 'jotai';
import dynamic from 'next/dynamic';
import type React from 'react';
import { Analytics } from './analytics/Analytics';
import { Compose, type Provider } from './utils/Compose';
import ProgressProvider from './modules/ProgressProvider';
import ThemeProvider from './modules/ThemeProvider';

const Toaster = dynamic(
	() => import('../components/ui/Sonner').then((mod) => mod.Toaster),
	{ ssr: false }
);

const AppProviders: Provider = Compose(
	JotaiProvider,
	ThemeProvider,
	ProgressProvider
);

type ProvidersProps = {
	children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps): React.JSX.Element => (
	<AppProviders>
		{children}
		<Toaster position="bottom-right" />
		<Analytics />
	</AppProviders>
);
