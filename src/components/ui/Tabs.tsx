'use client';

import { Tabs as Primitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const Tabs = ({
	className,
	...props
}: ComponentProps<typeof Primitive.Root>) => (
	<Primitive.Root
		className={cn('flex flex-col gap-2', className)}
		data-slot="tabs"
		{...props}
	/>
);

export const TabsList = ({
	className,
	...props
}: ComponentProps<typeof Primitive.List>) => (
	<Primitive.List
		className={cn(
			'inline-flex h-8 w-fit items-center justify-center rounded-lg p-0.5',
			'bg-zinc-100 text-muted-foreground dark:bg-zinc-900',
			className,
		)}
		data-slot="tabs-list"
		{...props}
	/>
);

export const TabsTrigger = ({
	className,
	...props
}: ComponentProps<typeof Primitive.Trigger>) => (
	<Primitive.Trigger
		className={cn(
			'inline-flex flex-1 items-center justify-center gap-2',
			'whitespace-nowrap rounded-md px-4 py-1 font-medium font-sans text-sm',
			'data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700',
			'data-[state=active]:text-foreground data-[state=active]:shadow-sm',
			"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
			'disabled:pointer-events-none disabled:opacity-50',
			'focus-visible:border-ring',
			'focus-visible:outline-1',
			'focus-visible:outline-ring',
			'focus-visible:ring-[3px]',
			'focus-visible:ring-ring/50',
			'transition-[color]',
			className,
		)}
		data-slot="tabs-trigger"
		{...props}
	/>
);

export const TabsContent = ({
	className,
	...props
}: ComponentProps<typeof Primitive.Content>) => (
	<Primitive.Content
		className={cn('flex-1 outline-none', className)}
		data-slot="tabs-content"
		{...props}
	/>
);
