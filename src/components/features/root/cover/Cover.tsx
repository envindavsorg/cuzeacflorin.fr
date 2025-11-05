import type React from 'react';
import type { HeaderProps } from '@/components/features/root/header/Header';
import { cn } from '@/lib/utils';
import { Greetings } from './elements/Greetings';
import { GreetingsContext } from './elements/GreetingsContext';

export type CoverProps = {
	capture?: boolean;
};

export const Cover = ({ capture }: HeaderProps): React.JSX.Element => (
	<GreetingsContext>
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
			<Greetings capture={capture} />
		</div>
	</GreetingsContext>
);
