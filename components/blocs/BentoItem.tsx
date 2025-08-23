import type React from 'react';

type BentoItemProps = {
	component: React.ComponentType;
};

export const BentoItem = ({
	component: Component,
	...props
}: Readonly<
	BentoItemProps & React.HTMLAttributes<HTMLDivElement>
>): React.JSX.Element => (
	<div
		{...props}
		style={
			{
				transition: '0.25s ease',
			} as React.CSSProperties
		}
	>
		{<Component />}
	</div>
);
