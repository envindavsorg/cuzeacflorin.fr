'use client';

import { useTheme } from 'next-themes';
import type React from 'react';
import { useMemo } from 'react';
import { AppleDevice } from '@/components/elements/AppleDevice';
import { AppleSafari } from '@/components/elements/AppleSafari';
import { baseURL } from '@/resources/meta';

const IMAGE_BASE_PATH = '/images/portfolio/screen/' as const;
const IMAGE_PATHS = {
	desktop: {
		light: `${IMAGE_BASE_PATH}/desktop/light.webp`,
		dark: `${IMAGE_BASE_PATH}/desktop/dark.webp`,
	},
	mobile: {
		light: `${IMAGE_BASE_PATH}/mobile/light.webp`,
		dark: `${IMAGE_BASE_PATH}/mobile/dark.webp`,
	},
} as const;

export const PortfolioMockup = (): React.JSX.Element => {
	const { resolvedTheme } = useTheme();

	const { desktop, mobile } = IMAGE_PATHS;
	const theme: ThemeValue = resolvedTheme === 'light' ? 'light' : 'dark';
	const images = useMemo(
		() => ({ desktop: desktop[theme], mobile: mobile[theme] }),
		[theme, desktop, mobile]
	);

	return (
		<>
			<AppleSafari
				className="-rotate-10 md:-rotate-20 lg:-rotate-25 absolute top-30 left-15 z-10 h-full w-100 md:top-20 md:left-20 lg:top-15 lg:left-15"
				src={images.desktop}
				url={baseURL}
			/>
			<div className="relative z-20">
				<div className="size-full pt-10 min-md:hidden">
					<AppleDevice className="size-full" src={images.mobile} />
				</div>
			</div>
		</>
	);
};

PortfolioMockup.displayName = 'PortfolioMockup';
