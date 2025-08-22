'use client';

import NumberFlow from '@number-flow/react';
import { ClockAfternoonIcon, ClockIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { CurrentDate } from '@/components/mdx/CurrentDate';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { cn } from '@/lib/utils';
import { timeActions, useTimeSelectors } from '@/stores/timeStore';

const FORMAT_OPTIONS = { minimumIntegerDigits: 2 };

const TimeSeparator = memo(() => (
	<span className="select-none px-1 font-normal text-theme text-xl md:text-2xl">
		:
	</span>
));

TimeSeparator.displayName = 'TimeSeparator';

export const ClockWidget = memo((): React.JSX.Element => {
	const hours = useTimeSelectors.hours();
	const minutes = useTimeSelectors.minutes();
	const seconds = useTimeSelectors.seconds();
	const isActive = useTimeSelectors.isActive();
	const [isAfternoonIcon, setIsAfternoonIcon] = useState(false);

	useEffect(() => {
		const iconInterval = setInterval(() => {
			setIsAfternoonIcon((prev) => !prev);
		}, 60_000);

		return () => clearInterval(iconInterval);
	}, []);

	useEffect(() => {
		if (!isActive) {
			return;
		}

		const delay = 1000 - (Date.now() % 1000);
		let interval: NodeJS.Timeout;

		timeActions.updateTime();

		const timeout = setTimeout(() => {
			timeActions.updateTime();
			interval = setInterval(timeActions.updateTime, 1000);
		}, delay);

		return () => {
			clearTimeout(timeout);
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [isActive]);

	const iconTransition = {
		type: 'spring' as const,
		stiffness: 200,
		damping: 20,
		duration: 0.5,
	};

	return (
		<Card
			className={cn(
				'relative items-center justify-center rounded-3xl md:p-4 lg:p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<div className="flex flex-col items-center justify-center gap-y-4">
				<div className="flex items-center justify-center p-2">
					<AnimatePresence initial={false} mode="wait">
						{isAfternoonIcon ? (
							<motion.div
								animate={{ scale: 1, rotate: 0, opacity: 1 }}
								exit={{ scale: 0, rotate: 90, opacity: 0 }}
								initial={{ scale: 0, rotate: -90, opacity: 0 }}
								key="afternoon"
								transition={iconTransition}
							>
								<ClockAfternoonIcon className="size-10 text-theme lg:size-18" />
							</motion.div>
						) : (
							<motion.div
								animate={{ scale: 1, rotate: 0, opacity: 1 }}
								exit={{ scale: 0, rotate: -90, opacity: 0 }}
								initial={{ scale: 0, rotate: 90, opacity: 0 }}
								key="normal"
								transition={iconTransition}
							>
								<ClockIcon className="size-10 text-theme lg:size-18" />
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className="flex flex-col items-center justify-center gap-y-2">
					<div
						className={cn(
							'flex items-center justify-center overflow-hidden font-geist-mono tabular-nums',
							'!p-0 *:font-bold *:font-pixelify-sans *:text-3xl *:text-theme'
						)}
					>
						<NumberFlow format={FORMAT_OPTIONS} value={hours} />
						<TimeSeparator />
						<NumberFlow format={FORMAT_OPTIONS} value={minutes} />
						<TimeSeparator />
						<NumberFlow format={FORMAT_OPTIONS} value={seconds} />
					</div>
					<CurrentDate
						className="text-muted-foreground text-sm"
						format="full"
						locale="fr-FR"
					/>
				</div>
			</div>

			<Pattern />
		</Card>
	);
});
