'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type FlipSentencesProps = {
	className?: string;
	sentences: string[];
	interval?: number;
};

export const FlipSentences = ({
	className,
	sentences,
	interval = 2500,
}: FlipSentencesProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const startInterval = () => {
			intervalRef.current = setInterval(() => {
				setCurrentIndex((prev) => (prev + 1) % sentences.length);
			}, interval);
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				if (!intervalRef.current) {
					setCurrentIndex((prev) => (prev + 1) % sentences.length);
					startInterval();
				}
			} else if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};

		startInterval();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange,
			);
		};
	}, [sentences.length, interval]);

	return (
		<AnimatePresence mode="wait">
			<motion.p
				animate={{ y: 0, opacity: 1 }}
				className={cn(
					'select-none text-balance font-mono text-muted-foreground text-sm',
					className,
				)}
				exit={{ y: -8, opacity: 0 }}
				initial={{ y: 8, opacity: 0 }}
				key={currentIndex}
				transition={{ duration: 0.3, ease: 'linear' }}
			>
				{sentences[currentIndex]}
			</motion.p>
		</AnimatePresence>
	);
};
