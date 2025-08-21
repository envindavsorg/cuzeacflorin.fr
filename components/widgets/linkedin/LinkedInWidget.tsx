import type React from 'react';
import { memo, Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { LinkedInWidgetContent } from '@/components/widgets/linkedin/LinkedInWidgetContent';
import { LinkedInWidgetSkeleton } from '@/components/widgets/linkedin/LinkedInWidgetSkeleton';
import { cn } from '@/lib/utils';

export const LinkedInWidget = memo((): React.JSX.Element => {
	return (
		<Card
			className={cn(
				'relative justify-center rounded-3xl bg-linkedin p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<Suspense fallback={<LinkedInWidgetSkeleton />}>
				<LinkedInWidgetContent />
			</Suspense>
		</Card>
	);
});

LinkedInWidget.displayName = 'LinkedInWidget';
