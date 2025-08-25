'use client';

import Link from 'next/link';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import { Card } from '@/components/ui/Card';
import { CvMetadata } from '@/components/widgets/cv/CvMetadata';
import { fetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { cv } = PROFILE_CONFIG;

export const CvWidget = memo((): React.JSX.Element => {
	const [shouldFetch, setShouldFetch] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShouldFetch(true), 2000);
		return () => clearTimeout(timer);
	}, []);

	const { data, isLoading, error } = useSWR(
		shouldFetch ? '/api/cv/metadata' : null,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	) as any;

	const handleMouseEnter = (): void => {
		toast.info('Découvrez mon CV !', {
			description: 'Cliquez pour le visualiser ou le télécharger.',
		});
	};

	const handleMouseLeave = (): void => {
		setTimeout(() => toast.dismiss(), 1000);
	};

	return (
		<Card
			className={cn(
				'!gap-0 flex-col items-center justify-center rounded-3xl',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Link
				aria-label={cv.shareText}
				className="flex flex-col items-center justify-center gap-y-3 md:p-4 lg:p-8"
				href={cv.filePath}
			>
				<h3 className="font-archivo-black font-bold text-4xl tracking-wide lg:text-5xl">
					CV
				</h3>
				{error ? null : (
					<CvMetadata isLoading={!shouldFetch || isLoading} metadata={data} />
				)}
			</Link>
		</Card>
	);
});
