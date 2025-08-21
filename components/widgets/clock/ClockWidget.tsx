'use client';

import NumberFlow from '@number-flow/react';
import type React from 'react';
import { memo, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { cn } from '@/lib/utils';
import { timeActions, useTimeSelectors } from '@/stores/timeStore';

const FORMAT_OPTIONS = { minimumIntegerDigits: 2 };
const NUMBER_STYLE = 'font-extrabold text-3xl md:text-5xl';

const TimeSeparator = memo(() => (
	<span className="select-none px-1 font-normal text-lg md:text-xl">:</span>
));

TimeSeparator.displayName = 'TimeSeparator';

export const ClockWidget = memo((): React.JSX.Element => {
	const hours = useTimeSelectors.hours();
	const minutes = useTimeSelectors.minutes();
	const seconds = useTimeSelectors.seconds();
	const isActive = useTimeSelectors.isActive();

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

	return (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<div className="flex items-center justify-center overflow-hidden p-4 font-geist-mono tabular-nums">
				<NumberFlow
					className={NUMBER_STYLE}
					format={FORMAT_OPTIONS}
					value={hours}
				/>
				<TimeSeparator />
				<NumberFlow
					className={NUMBER_STYLE}
					format={FORMAT_OPTIONS}
					value={minutes}
				/>
				<TimeSeparator />
				<NumberFlow
					className={NUMBER_STYLE}
					format={FORMAT_OPTIONS}
					value={seconds}
				/>
			</div>

			<Pattern />
		</Card>
	);
});
