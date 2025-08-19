import type React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextureProps {
	children?: React.ReactNode;
}

export const Texture = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & TextureProps
>(
	({ className, children, ...props }, ref): React.JSX.Element => (
		<div
			ref={ref}
			className={cn(
				'rounded-md max-sm:border max-sm:border-white/60 dark:max-sm:border-border/30',
				className,
			)}
			{...props}
		>
			<div className="rounded-md max-sm:border max-sm:border-black/10 dark:max-sm:border-neutral-900/80">
				<div className="rounded-md max-sm:border max-sm:border-white/50 dark:max-sm:border-neutral-950">
					<div className="rounded-md max-sm:border max-sm:border-neutral-950/20 dark:max-sm:border-neutral-900/70">
						<div className="w-full rounded-md max-sm:border max-sm:border-white/50 max-sm:bg-gradient-to-b max-sm:from-card/70 max-sm:to-secondary/50 dark:max-sm:border-neutral-700/50">
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	),
);
