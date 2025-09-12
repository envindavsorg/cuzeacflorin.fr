import { Player } from '@lordicon/react';
import type { IconData } from '@lordicon/react/dist/interfaces';
import type React from 'react';

type LordiconPlayerProps = {
	colorize?: string;
	icon: IconData;
	ref?: React.Ref<Player>;
	size?: number;
};

export const LordiconPlayer = ({
	colorize,
	icon,
	ref,
	size = 18,
}: LordiconPlayerProps): React.JSX.Element => (
	<Player
		colorize={colorize}
		direction={1}
		icon={icon}
		ref={ref}
		renderMode="HARDWARE"
		size={size}
	/>
);
