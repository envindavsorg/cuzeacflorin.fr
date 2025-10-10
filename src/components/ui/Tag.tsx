import type React from 'react';
import { cn } from '../../lib/utils';

const Tag = ({
	className,
	...props
}: React.ComponentProps<'span'>): React.JSX.Element => (
	<span
		className={cn(
			'inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 font-mono text-muted-foreground text-xs dark:bg-zinc-900',
			className
		)}
		{...props}
	/>
);

export { Tag };
