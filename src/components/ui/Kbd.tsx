import type React from 'react';
import { cn } from '@/lib/utils';

export const Kbd = ({
	className,
	...props
}: React.ComponentProps<'kbd'>): React.JSX.Element => (
	<kbd
		className={cn(
			'pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-sans text-muted-foreground text-xs',
			"[&_svg:not([class*='size-'])]:size-3",
			'[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
			className
		)}
		data-slot="kbd"
		{...props}
	/>
);

export const KbdGroup = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<kbd
		className={cn('inline-flex items-center gap-1', className)}
		data-slot="kbd-group"
		{...props}
	/>
);
