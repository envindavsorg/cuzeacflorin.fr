'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import type React from 'react';
import { cn } from '@/lib/utils';

export const Avatar = ({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>): React.JSX.Element => (
	<AvatarPrimitive.Root
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
}: React.ComponentProps<typeof AvatarPrimitive.Image>): React.JSX.Element => (
	<AvatarPrimitive.Image
		className={cn('aspect-square size-full', className)}
		data-slot="avatar-image"
		{...props}
	/>
);

export const AvatarFallback = ({
	className,
	...props
}: React.ComponentProps<
	typeof AvatarPrimitive.Fallback
>): React.JSX.Element => (
	<AvatarPrimitive.Fallback
		className={cn(
			'flex size-full items-center justify-center rounded-full bg-muted',
			className
		)}
		data-slot="avatar-fallback"
		{...props}
	/>
);
