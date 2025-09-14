import type React from 'react';

type WidgetItemProps = {
	children: React.ReactNode;
};

export const WidgetItem = ({
	children,
	...props
}: Readonly<
	WidgetItemProps & React.HTMLAttributes<HTMLDivElement>
>): React.JSX.Element => (
	<div {...props} style={{ transition: '0.25s ease' } as React.CSSProperties}>
		{children}
	</div>
);

WidgetItem.displayName = 'WidgetItem';
