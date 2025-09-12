import type React from 'react';
import { cn } from '@/lib/utils';

export const BreakpointIndicator = (): React.JSX.Element => (
	<div className="fixed bottom-5 left-5 flex items-center gap-x-3">
		<div
			className={cn(
				'z-50 flex aspect-square size-10 flex-col items-center justify-center',
				'rounded-full bg-theme font-archivo-black text-background text-sm'
			)}
		>
			<span className="sm:hidden">mobile</span>
			<span className="hidden sm:inline md:hidden">sm</span>
			<span className="hidden md:inline lg:hidden">md</span>
			<span className="hidden lg:inline xl:hidden">lg</span>
			<span className="hidden xl:inline">xl</span>
		</div>
	</div>
);
