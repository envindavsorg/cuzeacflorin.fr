import type React from 'react';
import { lazy, Suspense } from 'react';

const { NODE_ENV } = process.env;

const AnalyticsReact = lazy(() =>
	import('@vercel/analytics/react').then((module) => ({
		default: module.Analytics,
	}))
);

const SpeedInsights = lazy(() =>
	import('@vercel/speed-insights/react').then((module) => ({
		default: module.SpeedInsights,
	}))
);

export const Analytics = (): React.JSX.Element => (
	<Suspense fallback={null}>
		{NODE_ENV === 'production' && (
			<>
				<AnalyticsReact debug={false} mode={NODE_ENV} />
				<SpeedInsights debug={false} />
			</>
		)}
	</Suspense>
);
