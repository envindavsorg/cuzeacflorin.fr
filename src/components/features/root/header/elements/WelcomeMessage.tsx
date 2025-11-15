import { cn } from '@/lib/utils';

export const WelcomeMessage = () => (
	<div
		className={cn(
			'flex grow items-end pb-1 pl-4',
			'bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]',
			'bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56',
		)}
	>
		<div className="line-clamp-1 select-none font-mono text-xs text-zinc-300 dark:text-zinc-800">
			Bienvenue sur mon portfolio personnel.
		</div>
	</div>
);
