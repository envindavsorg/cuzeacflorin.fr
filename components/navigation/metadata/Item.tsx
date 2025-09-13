import type React from 'react';
import { cn } from '@/lib/utils';

type MetadataItemProps = {
	title: string;
	className?: string;
	children: React.ReactNode;
};

export const MetadataItem = ({
	title,
	className,
	children,
}: MetadataItemProps): React.JSX.Element => (
	<div className={cn(className, 'flex flex-col gap-y-1 text-sm')}>
		<span>{title}</span>
		{children}
	</div>
);

MetadataItem.displayName = 'MetadataItem';
