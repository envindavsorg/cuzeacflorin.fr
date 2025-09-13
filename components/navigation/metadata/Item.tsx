import type React from 'react';

type MetadataItemProps = {
	title: string;
	children: React.ReactNode;
};

export const MetadataItem = ({
	title,
	children,
}: MetadataItemProps): React.JSX.Element => (
	<div className="flex flex-col gap-y-1 text-sm">
		<span>{title}</span>
		{children}
	</div>
);

MetadataItem.displayName = 'MetadataItem';
