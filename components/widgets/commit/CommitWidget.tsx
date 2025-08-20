import { GitCommitIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo } from 'react';
import { getGitHubUserData } from '@/app/actions';
import { Card } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { Pattern } from '@/components/ui/Pattern';
import { cn } from '@/lib/utils';

export const CommitWidget = memo(async (): Promise<React.JSX.Element> => {
	const { contributions } = await getGitHubUserData();

	return (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<div className="flex h-full flex-col justify-between">
				<div className="inline-block">
					<GithubLogoIcon className="size-18" weight="regular" />
				</div>

				<div className="flex flex-col gap-y-2">
					<div className="flex items-center gap-x-3">
						<GitCommitIcon className="size-6" weight="regular" />
						<Counter
							className="font-bold font-pixelify-sans text-theme text-xl md:text-3xl"
							interval={10}
							value={contributions.totalContributions}
						>
							<span className="ms-1 text-lg md:text-xl">commits</span>
						</Counter>
					</div>
					<p className="text-muted-foreground text-sm">
						- effectués en tout, sur GitHub cette année ...
					</p>
				</div>
			</div>

			<Pattern />
		</Card>
	);
});
