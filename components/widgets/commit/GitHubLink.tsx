'use client';

import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { github } = PROFILE_CONFIG;

type GitHubLinkProps = {
	className?: string;
};

export const GitHubLink = ({
	className,
}: GitHubLinkProps): React.JSX.Element => {
	const MotionButton = motion.create(Button);

	return (
		<MotionButton
			className={cn('group bg-white', className)}
			size="icon"
			variant="icon"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<Link aria-label={github.label} href={github.url}>
				<ArrowUpRightIcon
					className="size-4.5 text-black transition-transform duration-300 group-hover:rotate-45"
					weight="regular"
				/>
				<span className="sr-only">{github.handle}</span>
			</Link>
		</MotionButton>
	);
};

GitHubLink.displayName = 'GitHubLink';
