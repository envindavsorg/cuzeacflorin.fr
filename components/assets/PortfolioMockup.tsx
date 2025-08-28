'use client';

import { useTheme } from 'next-themes';
import type React from 'react';
import { useEffect, useState } from 'react';
import { MockSafari } from '@/components/assets/Mock-Safari';
import { baseURL } from '@/resources/meta';

export const PortfolioMockup = (): React.JSX.Element => {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<MockSafari
			className="-rotate-10 md:-rotate-20 lg:-rotate-25 absolute top-30 left-15 h-full w-100 md:top-20 md:left-20 lg:top-15 lg:left-15"
			imageSrc={
				!mounted || resolvedTheme === 'light'
					? '/images/portfolio/screen/light.webp'
					: '/images/portfolio/screen/dark.webp'
			}
			url={baseURL}
		/>
	);
};
