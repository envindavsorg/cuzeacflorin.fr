'use client';

import type React from 'react';
import { memo, useState } from 'react';
import useSWR from 'swr';
import { Card } from '@/components/ui/Card';
import { fetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';

export const CV = memo((): React.JSX.Element => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error, isLoading } = useSWR(
		shouldFetch ? '/api/cv/metadata' : null,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	return (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl px-8 py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			test
		</Card>
	);
});
