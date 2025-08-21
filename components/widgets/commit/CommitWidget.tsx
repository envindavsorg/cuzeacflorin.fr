import { GitCommitIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { memo, Suspense } from 'react';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { DataContent } from '@/components/widgets/commit/DataContent';
import { DataSkeleton } from '@/components/widgets/commit/DataSkeleton';
import { GitHubLink } from '@/components/widgets/commit/GitHubLink';
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
			<GitHubLink className="absolute top-5 right-5" />

			<div className="flex h-full flex-col justify-between">
				<div className="inline-block">
					<GithubLogoIcon className="size-18 text-violet-600 dark:text-violet-300" />
				</div>
				<div className="flex flex-col gap-y-1">
					<div className="flex items-center gap-x-3">
						<GitCommitIcon className="size-7" />
						<Suspense fallback={<DataSkeleton />}>
							<DataContent />
						</Suspense>
					</div>
					<p className="text-muted-foreground text-sm">
						- effectués cette année
					</p>
				</div>
			</div>

			<Pattern />
		</Card>
	),
);

CommitWidget.displayName = 'CommitWidget';
