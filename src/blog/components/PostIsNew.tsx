import type React from 'react';
import { cn } from '@/lib/utils';

type PostIsNewProps = {
	className?: string;
};

export const PostIsNew = ({ className }: PostIsNewProps): React.JSX.Element => (
	<span className={cn('relative flex items-center justify-center', className)}>
		<span className="absolute inline-flex size-3 animate-ping rounded-full bg-theme opacity-50" />
		<span className="relative inline-flex size-2 rounded-full bg-theme" />
	</span>
);
