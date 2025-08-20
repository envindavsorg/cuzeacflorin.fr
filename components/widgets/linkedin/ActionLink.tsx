'use client';

import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '@/components/ui/Button';
import { PROFILE_CONFIG } from '@/resources/profile';

const { linkedin } = PROFILE_CONFIG;

export const ActionLink = (): React.JSX.Element => {
	const MotionButton = motion.create(Button);

	return (
		<MotionButton
			className="absolute right-5 bottom-5 bg-white"
			size="icon"
			variant="icon"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<Link
				aria-label="Découvrez mon profil LinkedIn !"
				href={linkedin.url}
			>
				<ArrowUpRightIcon
					className="size-4.5 text-black transition-transform duration-300 group-hover:rotate-45"
					weight="regular"
				/>
			</Link>
		</MotionButton>
	);
};
