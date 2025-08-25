import NumberFlow from '@number-flow/react';
import type React from 'react';

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
