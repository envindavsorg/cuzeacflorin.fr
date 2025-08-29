'use client';

import {
	Arrow,
	Content,
	Portal,
	Provider,
	Root,
	Trigger,
} from '@radix-ui/react-tooltip';
import type React from 'react';
import { cn } from '@/lib/utils';

export const TooltipProvider = ({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof Provider>): React.JSX.Element => (
	<Provider
		data-slot="tooltip-provider"
		delayDuration={delayDuration}
		{...props}
	/>
);

export const Tooltip = ({
	...props
}: React.ComponentProps<typeof Root>): React.JSX.Element => (
	<TooltipProvider>
		<Root data-slot="tooltip" {...props} />
	</TooltipProvider>
);

export const TooltipTrigger = ({
	...props
}: React.ComponentProps<typeof Trigger>): React.JSX.Element => (
	<Trigger data-slot="tooltip-trigger" {...props} />
);

export const TooltipContent = ({
	className,
	sideOffset = 0,
	children,
	...props
}: React.ComponentProps<typeof Content>): React.JSX.Element => (
	<Portal>
		<Content
			className={cn(
				'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-black px-2 py-1.25 text-white text-xs data-[state=closed]:animate-out dark:bg-white dark:text-black',
				className
			)}
			data-slot="tooltip-content"
			sideOffset={sideOffset}
			{...props}
		>
			<span className="font-medium text-xs">{children}</span>
			<Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-black fill-black dark:bg-white dark:fill-white" />
		</Content>
	</Portal>
);
