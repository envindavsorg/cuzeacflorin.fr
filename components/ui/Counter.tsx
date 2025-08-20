'use client';

import NumberFlow from '@number-flow/react';
import type React from 'react';
import { memo, useEffect, useState } from 'react';

type CounterProps = {
	value: number;
	interval?: number;
	children?: React.ReactNode;
	className?: string;
};

export const Counter = memo(
	({
		value,
		interval = 150,
		children,
		className,
	}: CounterProps): React.JSX.Element => {
		const [displayValue, setDisplayValue] = useState(0);

		useEffect(() => {
			let current = 0;
			setDisplayValue(0);

			if (value > 0) {
				const tick = () => {
					current += 1;
					setDisplayValue(current);
					if (current < value) {
						setTimeout(tick, interval);
					}
				};
				tick();
			}
		}, [value, interval]);

		return (
			<span className={className}>
				<NumberFlow respectMotionPreference value={displayValue} /> {children}
			</span>
		);
	}
);

Counter.displayName = 'Counter';
