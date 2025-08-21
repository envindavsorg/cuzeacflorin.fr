import { LinkedinLogoIcon, UsersIcon } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo, Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { DataContent } from '@/components/widgets/linkedin/DataContent';
import { DataSkeleton } from '@/components/widgets/linkedin/DataSkeleton';
import { LinkedinLink } from '@/components/widgets/linkedin/LinkedInLink';
import { cn } from '@/lib/utils';

export const LinkedInWidget = memo(
	(): React.JSX.Element => (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<LinkedinLink className="absolute top-5 right-5" />

			<div className="flex h-full flex-col justify-between">
				<div className="inline-block">
					<LinkedinLogoIcon className="size-18 text-blue-600 dark:text-blue-300" />
				</div>

				<div className="flex flex-col gap-y-1">
					<div className="flex items-center gap-x-3">
						<UsersIcon className="size-7" />
						<Suspense fallback={<DataSkeleton />}>
							<DataContent />
						</Suspense>
					</div>
					<p className="text-muted-foreground text-sm">
						- sur LinkedIn
					</p>
				</div>
			</div>

			<Pattern />
		</Card>
	),
);

LinkedInWidget.displayName = 'LinkedInWidget';
