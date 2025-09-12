import type React from 'react';
import { useEffect } from 'react';
import { useScramble } from 'use-scramble';

type ScrambleTextProps = {
	text: string;
	trigger?: boolean;
	className?: string;
};

export const ScrambleText = ({
	text,
	trigger,
	className,
}: ScrambleTextProps): React.JSX.Element => {
	const { ref, replay } = useScramble({
		text,
		speed: 0.5,
		tick: 1,
	});

	useEffect(() => {
		if (trigger) {
			replay();
		}
	}, [trigger, replay]);

	return (
		<span
			className={className}
			onFocus={replay}
			onMouseOver={replay}
			ref={ref}
		/>
	);
};
