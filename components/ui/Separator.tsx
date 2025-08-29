'use client';

import { Root } from '@radix-ui/react-separator';
import type React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Separator = forwardRef<
	React.ComponentRef<typeof Root>,
	React.ComponentPropsWithoutRef<typeof Root>
>(
	(
		{
			className,
			orientation = 'horizontal',
			decorative = true,
			...props
		}: React.ComponentPropsWithoutRef<typeof Root> & {
			decorative?: boolean;
			orientation?: 'horizontal' | 'vertical';
		},
		ref
	): React.JSX.Element => (
		<Root
			className={cn(
				'shrink-0 bg-border',
				orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
				className
			)}
			decorative={decorative}
			orientation={orientation}
			ref={ref}
			{...props}
		/>
	)
);
