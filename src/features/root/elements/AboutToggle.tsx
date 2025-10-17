'use client';

import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

type AboutToggleProps = {
	children: React.ReactNode;
};

export const AboutToggle = ({
	children,
}: AboutToggleProps): React.JSX.Element => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						animate={{
							opacity: 1,
							height: 'auto',
						}}
						exit={{
							opacity: 0,
							height: 0,
						}}
						initial={{
							opacity: 0,
							height: 0,
						}}
						transition={{
							duration: 0.3,
							ease: [0.4, 0, 0.2, 1],
						}}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
			<div className="screen-line-before flex justify-center py-2 md:justify-end">
				<Button onClick={() => setIsExpanded(!isExpanded)} variant="default">
					{isExpanded ? 'Voir moins' : 'En savoir plus'}
					{isExpanded ? (
						<CaretUpIcon className="size-4 transition-transform duration-300 ease-in-out" />
					) : (
						<CaretDownIcon className="size-4 transition-transform duration-300 ease-in-out" />
					)}
				</Button>
			</div>
		</>
	);
};
