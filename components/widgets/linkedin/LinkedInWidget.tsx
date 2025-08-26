import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { memo, Suspense } from 'react';
import {
	getLinkedInFollowers,
	type LinkedInData,
} from '@/actions/linkedin.action';
import { Card, CardLink } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { SkeletonData } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const {
	linkedin: { handle, label, url },
} = PROFILE_CONFIG;

export const LinkedInWidget = memo(async () => {
	const { count } = (await getLinkedInFollowers()) as LinkedInData;

	return (
		<Card
			className={cn(
				'h-full p-6 lg:p-8',
				'lg:flex lg:flex-col lg:items-start lg:justify-between lg:gap-x-6',
				'grid grid-cols-2 content-between md:grid-cols-4'
			)}
			pattern
		>
			<LinkedinLogoIcon
				className={cn(
					'inline-block size-12 lg:size-16',
					'justify-self-start md:col-span-2'
				)}
			/>

			<CardLink
				className={cn(
					'lg:absolute lg:top-5 lg:right-5',
					'justify-self-end md:col-span-2'
				)}
				handle={handle}
				label={label}
				url={url}
			/>

			<div
				className={cn(
					'lg:flex lg:flex-col lg:gap-y-0.5',
					'col-span-full md:col-span-4'
				)}
			>
				<Suspense fallback={<SkeletonData />}>
					<Counter
						className="p-0 font-archivo-black font-bold text-3xl tabular-nums tracking-wide md:text-4xl lg:text-5xl"
						interval={10}
						step={10}
						value={count}
					>
						<span className="inline-block text-2xl md:text-3xl lg:text-4xl min-lg:hidden">
							abonnés
						</span>
					</Counter>
				</Suspense>
				<p className="hidden text-muted-foreground text-sm lg:inline-block">
					- abonnés sur LinkedIn
				</p>
			</div>
		</Card>
	);
});

LinkedInWidget.displayName = 'LinkedInWidget';
