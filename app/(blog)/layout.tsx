'use client';

import type React from 'react';
import useIsMounted from '@/hooks/useIsMounted';
import { cn } from '@/lib/utils';

type LayoutBlogProps = {
	children: React.ReactNode;
};

const LayoutBlog = ({
	children,
}: Readonly<LayoutBlogProps>): React.JSX.Element => {
	const isMounted = useIsMounted();

	return (
		<div
			className={cn(
				'relative mx-auto flex w-full max-w-4xl flex-1 flex-col',
				'transition-[opacity,_transform] duration-700',
				isMounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
			)}
		>
			{children}
		</div>
	);
};

export default LayoutBlog;
