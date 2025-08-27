'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo } from 'react';
import darkMap from '@/images/map/dark.webp';
import lightMap from '@/images/map/light.webp';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName } = PROFILE_CONFIG;

export const FallbackImage = memo((): React.JSX.Element => {
	const { resolvedTheme } = useTheme();

	return (
		<Image
			alt={`${firstName} ${lastName}`}
			className="size-full object-cover"
			height={448}
			priority
			sizes="(max-width: 768px) 448px, 656px"
			src={resolvedTheme === 'dark' ? darkMap : lightMap}
			width={656}
		/>
	);
});

FallbackImage.displayName = 'FallbackImage';
