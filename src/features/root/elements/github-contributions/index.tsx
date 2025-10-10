import { Suspense } from 'react';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Tag } from '@/components/ui/Tag';
import { getGitHubUserData } from '@/features/root/actions/github.action';
import { getGitHubContributions } from '@/features/root/data/github-contributions';
import { Graph, GraphFallback } from './Graph';

export const GitHubContributions = async () => {
	const contributions = getGitHubContributions();
	const { stars, followers, following } = await getGitHubUserData();

	return (
		<Panel id="github-contributions">
			<PanelHeader>
				<PanelTitle>Mes statistiques GitHub</PanelTitle>
			</PanelHeader>

			<PanelContent>
				<p className="mb-3 text-muted-foreground text-sm">
					Voici un aperçu de mon activité récente sur GitHub, incluant le nombre
					d'étoiles, d'abonnés et de commits.
				</p>
				<Suspense fallback={<GraphFallback />}>
					<Graph contributions={contributions} />
				</Suspense>

				<ul className="mt-3 flex flex-wrap gap-1.5">
					<li className="flex">
						<Tag>{stars} étoiles</Tag>
					</li>
					<li className="flex">
						<Tag>{following} suivis</Tag>
					</li>
					<li className="flex">
						<Tag>{followers} abonnés</Tag>
					</li>
				</ul>
			</PanelContent>
		</Panel>
	);
};
