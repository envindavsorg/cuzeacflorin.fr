import type React from 'react';
import { cn } from '@/lib/utils';

type ContainerProps<T extends React.ElementType> = {
	as?: T;
};

export const Container = <T extends React.ElementType = 'div'>({
	as,
	...props
}: ContainerProps<T> &
	Omit<
		React.ComponentPropsWithoutRef<T>,
		keyof ContainerProps<T>
	>): React.JSX.Element => {
	const Component = as ?? 'div';

	return (
		<Component
			{...props}
			className={cn(
				'mx-auto px-4 py-6',
				'max-w-[1200px] max-sm:max-w-[320px] max-md:max-w-[375px] max-lg:max-w-[800px]',
				props.className
			)}
		/>
	);
};
