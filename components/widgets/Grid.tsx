import type React from 'react';
import { Motion } from '@/components/animation/motion/motion';
import { cn } from '@/lib/utils';

type WidgetGridProps = {
	children: React.ReactNode;
	className?: string;
};

export const WidgetGrid = ({
	children,
	className,
}: WidgetGridProps): React.JSX.Element => (
	<Motion
		animate="visible"
		className={cn(
			className,
			'grid auto-rows-fr grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'
		)}
	>
		{children}
	</Motion>
);

WidgetGrid.displayName = 'WidgetGrid';
