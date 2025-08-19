import Link, { type LinkProps } from 'next/link';
import type React from 'react';
import { cn } from '@/lib/utils';

export const Anchor = ({
	...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> &
	LinkProps): React.JSX.Element => (
	<Link
		{...props}
		className={cn(
			'group inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full bg-white p-3 transition-all duration-300',
			'outline-hidden ring-2 ring-gray-200/45 focus-within:outline-hidden focus-within:ring-4 hover:ring-4 dark:text-black dark:ring-gray-200/30',
			props.className,
		)}
	/>
);
