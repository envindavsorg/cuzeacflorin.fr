'use client';

import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '@/components/ui/Button';
import { Pattern } from '@/components/ui/Pattern';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

type CardProps = {
	pattern?: boolean;
};

const Card = ({
	className,
	children,
	pattern = false,
	...props
}: React.ComponentProps<'div'> & CardProps): React.JSX.Element => (
	<div
		className={cn(
			'relative rounded-xl border bg-card text-card-foreground md:rounded-3xl',
			'size-full select-none overflow-hidden shadow-xs transition-shadow duration-300 hover:shadow-sm',
			className
		)}
		data-slot="card"
		{...props}
	>
		{children}
		{pattern && <Pattern />}
	</div>
);

const CardHeader = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn(
			'@container/card-header z-10 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-3',
			className
		)}
		data-slot="card-header"
		{...props}
	/>
);

const CardTitle = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('z-10 font-semibold leading-none', className)}
		data-slot="card-title"
		{...props}
	/>
);

const CardDescription = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('z-10 text-muted-foreground text-sm', className)}
		data-slot="card-description"
		{...props}
	/>
);

const CardAction = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn(
			'z-10 col-start-2 row-span-2 row-start-1 self-start justify-self-end',
			className
		)}
		data-slot="card-action"
		{...props}
	/>
);

const CardContent = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('z-10 px-3', className)}
		data-slot="card-content"
		{...props}
	/>
);

const CardFooter = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('z-10 flex items-center px-3 [.border-t]:pt-3', className)}
		data-slot="card-footer"
		{...props}
	/>
);

type LinkedinLinkProps = {
	className?: string;
	url: string;
	handle: string;
	label: string;
};

const CardLink = ({
	className,
	url,
	handle,
	label,
}: LinkedinLinkProps): React.JSX.Element => {
	const MotionButton = motion.create(Button);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<MotionButton
					className={cn('group', className)}
					size="icon"
					variant="icon"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Link aria-label={label} href={url}>
						<ArrowUpRightIcon className="size-4.5 text-black transition-transform duration-300 group-hover:rotate-45" />
						<span className="sr-only">{handle}</span>
					</Link>
				</MotionButton>
			</TooltipTrigger>
			<TooltipContent align="center" side="left" sideOffset={5}>
				{label}
			</TooltipContent>
		</Tooltip>
	);
};

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
	CardLink,
};
