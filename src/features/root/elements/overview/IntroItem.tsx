import type { Icon } from '@phosphor-icons/react';
import type React from 'react';

type IntroItemProps = {
	icon: Icon;
	content: React.ReactNode;
	href?: string;
};

const IntroItem = ({
	icon: Icon,
	content,
	href,
}: IntroItemProps): React.JSX.Element => (
	<div className="flex items-center gap-4 font-medium font-mono text-sm">
		<div
			aria-hidden
			className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
		>
			<Icon className="pointer-events-none size-5 text-muted-foreground" />
		</div>

		<p className="text-balance">
			{href ? (
				<a
					className="underline-offset-4 hover:underline"
					href={href}
					rel="noopener noreferrer"
					target="_blank"
				>
					{content}
				</a>
			) : (
				content
			)}
		</p>
	</div>
);

IntroItem.displayName = 'IntroItem';

export { IntroItem };
