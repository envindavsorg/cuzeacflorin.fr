'use client';

import { ArrowUpRightIcon, type IconProps } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { Button } from '@/components/ui/Button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

const Card = ({
	className,
	children,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn(
			'group relative size-full select-none overflow-hidden rounded-none border border-input bg-card text-card-foreground',
			className
		)}
		data-slot="card"
		{...props}
	>
		{children}
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

type CardLinkProps = {
	className?: string;
	url: string;
	handle?: string;
	label: string;
	icon?: React.ComponentType<IconProps>;
	rotate?: boolean;
};

const CardLink = ({
	className,
	url,
	handle,
	label,
	icon: Icon = ArrowUpRightIcon,
	rotate = true,
}: CardLinkProps): React.JSX.Element => {
	const MotionButton = motion.create(Button);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link aria-label={label} className={className} href={url}>
					<MotionButton
						aria-label={label}
						asChild
						className="group"
						size="icon"
						variant="icon"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span>
							<Icon
								className={cn(
									'size-5 text-black',
									rotate &&
										'transition-transform duration-300 group-hover:rotate-45'
								)}
							/>
							{handle && <span className="sr-only">{handle}</span>}
						</span>
					</MotionButton>
				</Link>
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
