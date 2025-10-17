import { Suspense } from 'react';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Tag } from '@/components/ui/Tag';
import { Prose } from '@/components/ui/Typography';
import { getGitHubUserData } from '@/features/root/actions/github.action';
import { CommitsGraph, GraphFallback } from './CommitsGraph';

export const Commits = async () => {
	const { stars, followers, following, contributions } =
		await getGitHubUserData();

	return (
		<Panel id="github-contributions">
			<PanelHeader>
				<PanelTitle>Mes statistiques GitHub</PanelTitle>
			</PanelHeader>

			<PanelContent className="screen-line-after py-2">
				<Prose className="text-muted-foreground">
					Voici un aperçu de mon activité récente sur GitHub, incluant le nombre
					d'étoiles, d'abonnés et de commits.
				</Prose>
			</PanelContent>

			<PanelContent>
				<Suspense fallback={<GraphFallback />}>
					<CommitsGraph contributions={contributions} />
				</Suspense>
			</PanelContent>

			<PanelContent className="screen-line-before py-2">
				<ul className="flex flex-wrap justify-end gap-1.5">
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
