'use client';

import { Fallback, Image, Root } from '@radix-ui/react-avatar';
import type React from 'react';
import { cn } from '@/lib/utils';

export const Avatar = ({
	className,
	...props
}: React.ComponentProps<typeof Root>): React.JSX.Element => (
	<Root
		className={cn(
			'relative flex size-8 shrink-0 overflow-hidden rounded-full',
			className
		)}
		data-slot="avatar"
		{...props}
	/>
);

export const AvatarImage = ({
	className,
	...props
}: React.ComponentProps<typeof Image>): React.JSX.Element => (
	<Image
		className={cn('aspect-square size-full', className)}
		data-slot="avatar-image"
		{...props}
	/>
);

export const AvatarFallback = ({
	className,
	...props
}: React.ComponentProps<typeof Fallback>): React.JSX.Element => (
	<Fallback
		className={cn(
			'flex size-full items-center justify-center rounded-full bg-muted',
			className
		)}
		data-slot="avatar-fallback"
		{...props}
	/>
);
