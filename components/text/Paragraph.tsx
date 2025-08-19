import type React from 'react';
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface ParagraphProps {
	children: React.ReactNode;
	className?: string;
}

export const Paragraph = memo(
	({ children, className }: ParagraphProps): React.JSX.Element => (
		<p
			className={cn(
				'text-neutral-600 text-sm leading-8 sm:text-base dark:text-neutral-300',
				className,
			)}
		>
			{children}
		</p>
	),
);

Paragraph.displayName = 'Paragraph';
