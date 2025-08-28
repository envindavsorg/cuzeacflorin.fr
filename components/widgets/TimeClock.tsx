'use client';

import NumberFlow from '@number-flow/react';
import type React from 'react';
import { memo } from 'react';
import { CurrentDate } from '@/components/elements/CurrentDate';
import { Card } from '@/components/ui/Card';
import useClockSync from '@/hooks/useClockSync';
import { cn } from '@/lib/utils';
import { useShowSeparator, useTimeParts } from '@/stores/time.store';

type AnimatedNumberProps = {
	value: number;
};

export const AnimatedNumber = ({
	value,
}: AnimatedNumberProps): React.JSX.Element => (
	<NumberFlow
		className="p-0 font-archivo-black font-bold text-4xl tabular-nums tracking-wide lg:text-5xl"
		format={{ minimumIntegerDigits: 2 }}
		value={value}
	/>
);

type ClockSeparatorProps = {
	show: boolean;
};

export const ClockSeparator = ({
	show,
}: ClockSeparatorProps): React.JSX.Element => (
	<span
		className={cn(
			'select-none px-1.5 font-normal font-sans text-xl lg:px-2 lg:text-3xl',
			'transition-opacity duration-300',
			show ? 'opacity-100' : 'opacity-0'
		)}
	>
		:
	</span>
);

export const TimeClock = memo((): React.JSX.Element => {
	const { hours, minutes } = useTimeParts();
	const showSeparator: boolean = useShowSeparator();

	useClockSync();

	return (
		<Card
			className={cn(
				'h-full md:p-4 lg:p-8',
				'flex flex-col items-center justify-center lg:gap-y-3'
			)}
			pattern
		>
			<div className="flex items-center justify-center overflow-hidden">
				<AnimatedNumber value={hours} />
				<ClockSeparator show={showSeparator} />
				<AnimatedNumber value={minutes} />
			</div>
			<CurrentDate className="text-xl uppercase lg:text-2xl" format="weekday" />
		</Card>
	);
});

TimeClock.displayName = 'TimeClock';
