'use client';

import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '@/components/ui/Button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

type ArticleLinkProps = {
	url: string;
	label: string;
	className?: string;
};

export const ArticleLink = ({
	url,
	label,
	className,
}: ArticleLinkProps): React.JSX.Element => {
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
						<ArrowUpRightIcon className="size-4.5 transition-transform duration-300 group-hover:rotate-45" />
						<span className="sr-only">{label}</span>
					</Link>
				</MotionButton>
			</TooltipTrigger>
			<TooltipContent align="center" side="left" sideOffset={5}>
				Lire l'article !
			</TooltipContent>
		</Tooltip>
	);
};

ArticleLink.displayName = 'ArticleLink';
