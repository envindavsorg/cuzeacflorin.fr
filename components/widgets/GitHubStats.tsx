'use client';

import {
	ArrowRightIcon,
	GitBranchIcon,
	GitCommitIcon,
	GithubLogoIcon,
} from '@phosphor-icons/react';
import type React from 'react';
import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { GridItem } from '@/components/widgets/GridItem';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { github } = PROFILE_CONFIG;

type GitHubStatsProps = {
	status: string | null;
	stars: number;
	commits: number;
	followers: number;
};

export const GitHubStats = memo(
	({
		status,
		stars,
		commits,
		followers,
	}: GitHubStatsProps): React.JSX.Element => (
		<GridItem aria="Lire l'article !" link={github.url} slug="my-github-stats">
			<Card className="flex h-full flex-col justify-center p-4">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-base tracking-tight group-hover:text-theme sm:text-lg">
						Mes statistiques GitHub
					</h3>
					<span
						className={cn(
							'whitespace-nowrap rounded-[3px] px-1 py-[1px]',
							'bg-linear-to-b from-primary/5 to-muted/40 text-xs',
							'inset-shadow-2xs inset-shadow-white/25',
							'border-[1px] border-theme/10 group-hover:border-primary/10',
							'text-theme group-hover:text-primary'
						)}
					>
						{status}
					</span>
				</div>

				<Paragraph className="!text-xs sm:!text-sm mt-2 line-clamp-3 text-muted-foreground sm:mt-3">
					Voici un aperçu de mon activité récente sur GitHub, incluant le nombre
					d'étoiles, d'abonnés et de commits.
				</Paragraph>

				<div className="mt-2 flex-1">
					<div className="flex flex-wrap gap-1.5">
						<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
							{stars} étoiles
						</div>
						<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
							{commits} commits
						</div>
						<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
							{followers} abonnés
						</div>
					</div>
				</div>

				<div className="mt-3 flex items-center justify-between gap-3">
					<div className="flex items-center gap-x-3">
						<GithubLogoIcon className="size-4 shrink-0" />
						<GitBranchIcon className="size-4 shrink-0" />
						<GitCommitIcon className="size-4 shrink-0" />
					</div>
					<div className="flex items-center gap-x-1 *:text-muted-foreground">
						<span className="text-xs group-hover:text-theme sm:text-sm">
							Voir mon profil
						</span>
						<ArrowRightIcon className="group-hover:-rotate-45 text-sm transition duration-200 group-hover:text-theme sm:text-base" />
					</div>
				</div>
			</Card>
		</GridItem>
	)
);
