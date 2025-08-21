import type React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		data-slot="skeleton"
		className={cn('animate-pulse rounded-md bg-accent', className)}
		{...props}
	/>
);
