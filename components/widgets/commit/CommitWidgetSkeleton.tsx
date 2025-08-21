import type React from 'react';
import { memo } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const CommitWidgetSkeleton = memo((): React.JSX.Element => {
	return (
		<div className="flex items-center gap-x-3">
			<Skeleton className="h-10 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
			<Skeleton className="h-10 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
		</div>
	);
});

CommitWidgetSkeleton.displayName = 'CommitWidgetSkeleton';
