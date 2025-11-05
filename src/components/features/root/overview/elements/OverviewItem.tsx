import type { Icon } from '@phosphor-icons/react';
import Link from 'next/link';
import type React from 'react';
import { cn } from '@/lib/utils';

type OverviewItemProps = {
	icon: Icon;
	content: React.ReactNode;
	href?: string;
	className?: string;
};

export const OverviewItem = ({
	icon: Icon,
	content,
	href,
	className,
}: OverviewItemProps): React.JSX.Element => (
	<div
		className={cn(
			'flex items-center gap-4',
			'font-medium font-mono text-sm',
			className
		)}
	>
		<div
			aria-hidden
			className={cn(
				'flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted',
				'ring-1 ring-edge ring-offset-1 ring-offset-background',
				'border border-muted-foreground/15'
			)}
		>
			<Icon
				className="pointer-events-none size-5 text-theme"
				weight="duotone"
			/>
		</div>

		<p className="text-balance font-medium">
			{href ? (
				<Link
					className="underline-offset-4 hover:underline"
					href={href}
					rel="noopener noreferrer"
					target="_blank"
				>
					{content}
				</Link>
			) : (
				content
			)}
		</p>
	</div>
);
