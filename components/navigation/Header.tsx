import Head from 'next/head';
import type React from 'react';
import { defaultDescription } from '@/resources/meta';
import { PROFILE_CONFIG } from '@/resources/profile';

export const Header = (): React.JSX.Element => (
	<Head>
		<meta content={defaultDescription} name="description" />
		<meta content="yes" name="mobile-web-app-capable" />
		<meta content="default" name="apple-mobile-web-app-status-bar-style" />
		<meta
			content={`${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`}
			name="apple-mobile-web-app-title"
		/>
		<link href="/apple-touch-icon.png" rel="apple-touch-icon" />
		<link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
		<link href="https://fonts.googleapis.com" rel="preconnect" />
		<link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
		<link href="https://avatars.githubusercontent.com" rel="dns-prefetch" />
		<link href="https://api.mapbox.com" rel="dns-prefetch" />
		<link href="https://vitals.vercel-insights.com" rel="dns-prefetch" />
		<title>{`${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`}</title>
	</Head>
);
