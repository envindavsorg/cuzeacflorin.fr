'use client';

import { Tabs as TabsPrimitive } from 'radix-ui';
import type React from 'react';
import { cn } from '@/lib/utils';

const Tabs = ({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>): React.JSX.Element => (
	<TabsPrimitive.Root
		className={cn('flex flex-col gap-2', className)}
		data-slot="tabs"
		{...props}
	/>
);

const TabsList = ({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>): React.JSX.Element => (
	<TabsPrimitive.List
		className={cn(
			'inline-flex h-8 w-fit items-center justify-center rounded-lg p-0.5',
			'bg-zinc-100 text-muted-foreground dark:bg-zinc-900',
			className
		)}
		data-slot="tabs-list"
		{...props}
	/>
);

const TabsTrigger = ({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>): React.JSX.Element => (
	<TabsPrimitive.Trigger
		className={cn(
			"inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-1 font-medium font-sans text-sm transition-[color] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
			'data-[state=active]:bg-white data-[state=active]:text-foreground dark:data-[state=active]:bg-zinc-700',
			className
		)}
		data-slot="tabs-trigger"
		{...props}
	/>
);

const TabsContent = ({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>): React.JSX.Element => (
	<TabsPrimitive.Content
		className={cn('flex-1 outline-none', className)}
		data-slot="tabs-content"
		{...props}
	/>
);

export { Tabs, TabsContent, TabsList, TabsTrigger };
