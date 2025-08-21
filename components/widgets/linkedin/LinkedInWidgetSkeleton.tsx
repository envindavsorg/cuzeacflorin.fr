import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo } from 'react';

export const LinkedInWidgetSkeleton = memo((): React.JSX.Element => {
	return (
		<div className="flex h-full flex-col justify-between">
			<div className="inline-block">
				<LinkedinLogoIcon
					className="size-18 text-white"
					weight="regular"
				/>
			</div>

			<div className="flex flex-col space-y-2">
				<div className="h-8 w-24 animate-pulse rounded bg-white/20 md:h-10 md:w-32" />
				<div className="h-8 w-20 animate-pulse rounded bg-white/20 md:h-10 md:w-24" />
			</div>
		</div>
	);
});

LinkedInWidgetSkeleton.displayName = 'LinkedInWidgetSkeleton';
