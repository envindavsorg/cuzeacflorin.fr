import { CircleNotchIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { cn } from '@/lib/utils';

export const Spinner = ({
	className,
	...props
}: React.ComponentProps<'svg'>): React.JSX.Element => (
	<CircleNotchIcon
		aria-label="Loading"
		className={cn('size-4 animate-spin', className)}
		role="status"
		{...props}
	/>
);
