'use client';

import type React from 'react';
import { memo } from 'react';
import { CurrentDate } from '@/components/elements/CurrentDate';
import { Card } from '@/components/ui/Card';
import { AnimatedNumber } from '@/components/widgets/clock/AnimatedNumber';
import { ClockSeparator } from '@/components/widgets/clock/ClockSeparator';
import useClockSync from '@/hooks/useClockSync';
import { cn } from '@/lib/utils';
import { useShowSeparator, useTimeParts } from '@/stores/time.store';

export const ClockWidget = memo((): React.JSX.Element => {
	const { hours, minutes } = useTimeParts();
	const showSeparator: boolean = useShowSeparator();

	useClockSync();

	return (
		<Card
			className={cn(
				'!gap-0 flex-col items-center justify-center rounded-3xl md:p-4 lg:p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
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
