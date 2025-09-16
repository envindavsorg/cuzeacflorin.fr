'use client';

import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { defaultVariantsNoDelay } from '@/components/motion/motion.variants';

type GridItemProps = {
	aria: string;
	link: string;
	slug: string;
	children: React.ReactNode;
};

export const GridItem = ({
	aria,
	link,
	slug,
	children,
}: GridItemProps): React.JSX.Element => {
	const MotionLink = motion.create(Link);

	return (
		<MotionLink
			aria-label={aria}
			href={link}
			layoutId={slug}
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.025 }}
		>
			{children}
		</MotionLink>
	);
};
