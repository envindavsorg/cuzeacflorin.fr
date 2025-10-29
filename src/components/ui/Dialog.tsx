'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import type React from 'react';
import { cn } from '@/lib/utils';

const Dialog = ({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>): React.JSX.Element => (
	<DialogPrimitive.Root data-slot="dialog" {...props} />
);

const DialogTrigger = ({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>): React.JSX.Element => (
	<DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

const DialogPortal = ({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>): React.JSX.Element => (
	<DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

const DialogClose = ({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>): React.JSX.Element => (
	<DialogPrimitive.Close
		className="cursor-pointer"
		data-slot="dialog-close"
		{...props}
	/>
);

const DialogOverlay = ({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.JSX.Element => (
	<DialogPrimitive.Overlay
		className={cn(
			'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 pointer-events-none fixed inset-0 z-50 select-none bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
			className
		)}
		data-slot="dialog-overlay"
		{...props}
	/>
);

const DialogContent = ({
	className,
	overlay = true,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	overlay?: boolean;
}): React.JSX.Element => (
	<DialogPortal data-slot="dialog-portal">
		{overlay && <DialogOverlay />}
		<DialogPrimitive.Content
			className={cn(
				'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-input p-5 duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg',
				'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
				'bg-background bg-center bg-size-[10px_10px]',
				'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5',
				'outline-none focus:outline-none',
				className
			)}
			data-slot="dialog-content"
			{...props}
		>
			{children}
		</DialogPrimitive.Content>
	</DialogPortal>
);

const DialogHeader = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
		data-slot="dialog-header"
		{...props}
	/>
);

const DialogFooter = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('mt-6 flex flex-row items-center justify-between', className)}
		data-slot="dialog-footer"
		{...props}
	/>
);

const DialogTitle = ({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>): React.JSX.Element => (
	<DialogPrimitive.Title
		className={cn('font-semibold text-lg leading-normal', className)}
		data-slot="dialog-title"
		{...props}
	/>
);

const DialogDescription = ({
	className,
	...props
}: React.ComponentProps<
	typeof DialogPrimitive.Description
>): React.JSX.Element => (
	<DialogPrimitive.Description
		className={cn('text-muted-foreground text-sm', className)}
		data-slot="dialog-description"
		{...props}
	/>
);

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
