import { GitCommitIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { memo, Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { CommitWidgetContent } from '@/components/widgets/commit/CommitWidgetContent';
import { CommitWidgetSkeleton } from '@/components/widgets/commit/CommitWidgetSkeleton';
import { cn } from '@/lib/utils';

export const CommitWidget = memo(
	(): React.JSX.Element => (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<div className="flex h-full flex-col justify-between">
				<div className="inline-block">
					<GithubLogoIcon className="size-18" weight="regular" />
				</div>
				<div className="flex flex-col gap-y-2">
					<div className="flex items-center gap-x-3">
						<GitCommitIcon className="size-6" weight="regular" />
						<Suspense fallback={<CommitWidgetSkeleton />}>
							<CommitWidgetContent />
						</Suspense>
					</div>
					<p className="text-muted-foreground text-sm">
						- effectués en tout, sur GitHub cette année ...
					</p>
				</div>
			</div>

			<Pattern />
		</Card>
	),
);

CommitWidget.displayName = 'CommitWidget';
