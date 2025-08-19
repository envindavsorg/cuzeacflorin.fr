import type React from 'react';

interface GridItemProps {
	component: React.ComponentType;
}

export const GridItem = ({
	component: Component,
	...props
}: Readonly<
	GridItemProps & React.HTMLAttributes<HTMLDivElement>
>): React.JSX.Element => <div {...props}>{<Component />}</div>;
