import type React from 'react';
import { Greetings } from '@/components/animations/Greetings';
import { GreetingsContextMenu } from '@/features/context/GreetingsContextMenu';
import { cn } from '@/lib/utils';

export const Cover = (): React.JSX.Element => (
	<GreetingsContextMenu>
		<div
			className={cn(
				'aspect-2/1 select-none border-edge border-x sm:aspect-3/1',
				'flex items-center justify-center text-black dark:text-white',
				'screen-line-before screen-line-after before:-top-px after:-bottom-px',
				'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
				'bg-black/0.75 bg-center bg-size-[10px_10px] dark:bg-white/0.75',
				'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5'
			)}
		>
			<Greetings loop={true} speed={1} strokeWidth={15} />
		</div>
	</GreetingsContextMenu>
);
