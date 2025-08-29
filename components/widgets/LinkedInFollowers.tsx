import {
	LinkedinLogoIcon,
	UsersThreeIcon,
} from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo, Suspense } from 'react';
import { getLinkedInFollowers } from '@/actions/linkedin.action';
import { ShinyText } from '@/components/animation/ShinyText';
import { Card, CardLink } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { SkeletonData } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const {
	linkedin: { name, handle, label, url },
} = PROFILE_CONFIG;

export const LinkedInFollowers = memo(async (): Promise<React.JSX.Element> => {
	const { count } = await getLinkedInFollowers();

	return (
		<Card
			className={cn(
				'h-full px-6 py-5 md:py-6 lg:px-8 lg:py-8',
				'lg:flex lg:flex-col lg:items-start lg:justify-between lg:gap-x-6',
				'grid grid-cols-2 content-between md:grid-cols-4'
			)}
		>
			<div className="justify-self-start max-lg:flex max-lg:items-center max-lg:gap-x-3 md:col-span-2">
				<LinkedinLogoIcon className="inline-block size-10 max-lg:shrink-0 md:size-12 lg:size-16" />

				<ShinyText
					className="min-lg:hidden"
					disabled={false}
					speed={1}
					text={name}
				/>
			</div>

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
					'col-span-full md:col-span-4',
					'max-md:flex max-md:items-center max-md:gap-x-4'
				)}
			>
				<UsersThreeIcon
					className="inline-block size-8 text-theme md:hidden dark:text-white"
					weight="light"
				/>
				<Suspense fallback={<SkeletonData />}>
					<Counter
						className="p-0 font-archivo-black font-bold text-3xl text-black tabular-nums tracking-wide md:text-4xl lg:text-5xl dark:text-[#FCE24A]"
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
