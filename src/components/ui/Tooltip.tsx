'use client';

import { Tooltip as Primitive } from 'radix-ui';
import type React from 'react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const TooltipProvider = ({
	delayDuration = 0,
	...props
}: ComponentProps<typeof Primitive.Provider>): React.JSX.Element => (
	<Primitive.Provider
		data-slot="tooltip-provider"
		delayDuration={delayDuration}
		{...props}
	/>
);

export const Tooltip = ({
	...props
}: ComponentProps<typeof Primitive.Root>): React.JSX.Element => (
	<TooltipProvider>
		<Primitive.Root data-slot="tooltip" {...props} />
	</TooltipProvider>
);

export const TooltipTrigger = ({
	...props
}: ComponentProps<typeof Primitive.Trigger>): React.JSX.Element => (
	<Primitive.Trigger data-slot="tooltip-trigger" {...props} />
);

export const TooltipContent = ({
	className,
	sideOffset = 4,
	children,
	...props
}: ComponentProps<typeof Primitive.Content>): React.JSX.Element => (
	<Primitive.Portal>
		<Primitive.Content
			className={cn(
				'z-50 max-w-sm rounded-lg bg-primary px-4 py-2',
				'fade-in-0 zoom-in-95 animate-in',
				'font-mono text-primary-foreground text-sm',
				'data-[side=top]:slide-in-from-bottom-2',
				'data-[side=bottom]:slide-in-from-top-2',
				'data-[side=left]:slide-in-from-right-2',
				'data-[side=right]:slide-in-from-left-2',
				'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out',
				className
			)}
			data-slot="tooltip-content"
			sideOffset={sideOffset}
			{...props}
		>
			{children}
			<Primitive.Arrow
				className={cn(
					'z-50 size-2.5 rounded-[2px] bg-primary fill-primary',
					'translate-y-[calc(-50%-2px)] rotate-45'
				)}
			/>
		</Primitive.Content>
	</Primitive.Portal>
);
