import type React from 'react';

interface BentoItemProps {
	component: React.ComponentType;
}

export const BentoItem = ({
	component: Component,
	...props
}: Readonly<
	BentoItemProps & React.HTMLAttributes<HTMLDivElement>
>): React.JSX.Element => <div {...props}>{<Component />}</div>;
