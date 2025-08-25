import type React from 'react';
import { cn } from '@/lib/utils';

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
