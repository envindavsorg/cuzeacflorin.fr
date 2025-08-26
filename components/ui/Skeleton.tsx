import type React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('animate-pulse rounded-md bg-accent', className)}
		data-slot="skeleton"
		{...props}
	/>
);

export const SkeletonData = (): React.JSX.Element => (
	<div className="flex items-baseline gap-x-3">
		<Skeleton
			className={cn(
				'animate-pulse rounded-md border border-input border-dashed bg-input',
				'h-8 w-30 md:h-10 lg:w-25'
			)}
		/>
		<Skeleton
			className={cn(
				'animate-pulse rounded-md border border-input border-dashed bg-input',
				'h-6 w-20 md:h-8 md:w-30 lg:w-15'
			)}
		/>
	</div>
);
