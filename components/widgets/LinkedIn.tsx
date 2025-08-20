'use client';

import { ArrowUpRightIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { linkedin } = PROFILE_CONFIG;

export const LinkedIn = memo((): React.JSX.Element => {
	const MotionButton = motion.create(Button);

	return (
		<Card
			className={cn(
				'relative justify-center rounded-3xl bg-linkedin p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<div className="flex h-full flex-col justify-between">
				<div className="inline-block">
					<LinkedinLogoIcon className="size-18 text-white" weight="regular" />
				</div>

				<div className="flex flex-col">
					<h3 className="font-bold font-pixelify-sans text-white text-xl md:text-3xl">
						3000
					</h3>
					<h3 className="font-bold font-pixelify-sans text-white text-xl md:text-3xl">
						abonnés
					</h3>
				</div>
			</div>

			<MotionButton
				className="absolute right-5 bottom-5 bg-white"
				size="icon"
				variant="icon"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<Link aria-label="Découvrez mon profil LinkedIn !" href={linkedin.url}>
					<ArrowUpRightIcon
						className="size-4.5 text-black transition-transform duration-300 group-hover:rotate-45"
						weight="regular"
					/>
				</Link>
			</MotionButton>
		</Card>
	);
});
