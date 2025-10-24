'use client';

import { CheckIcon } from '@phosphor-icons/react';
import { Indicator, Root } from '@radix-ui/react-checkbox';
import type React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = forwardRef<
	React.ComponentRef<typeof Root>,
	React.ComponentPropsWithoutRef<typeof Root>
>(
	({ className, ...props }, ref): React.JSX.Element => (
		<Root
			className={cn(
				'peer grid size-4 shrink-0 place-content-center rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
				className
			)}
			ref={ref}
			{...props}
		>
			<Indicator className={cn('grid place-content-center text-current')}>
				<CheckIcon className="size-4" />
			</Indicator>
		</Root>
	)
);
