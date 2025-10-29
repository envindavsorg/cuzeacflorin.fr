import { Suspense } from 'react';
import { getGitHubUserData } from '@/components/features/root/actions/github.action';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Tag } from '@/components/ui/Tag';
import { Prose } from '@/components/ui/Typography';
import { CommitsGraph, GraphFallback } from './CommitsGraph';

export const Commits = async () => {
	const { stars, followers, following, contributions } =
		await getGitHubUserData();

	return (
		<Panel id="github-contributions">
			<PanelHeader>
				<PanelTitle>Mes statistiques GitHub</PanelTitle>
			</PanelHeader>

			<PanelContent className="screen-line-after *:text-muted-foreground">
				<Prose>
					Voici un aperçu de mon{' '}
					<span className="font-medium text-foreground">activité récente</span>{' '}
					sur GitHub, incluant le{' '}
					<span className="font-medium text-foreground">nombre d'étoiles</span>,{' '}
					<span className="font-medium text-foreground">d'abonnés</span> et de
					<span className="font-medium text-foreground">commits</span>. Ces
					métriques reflètent mon engagement constant dans l'écosystème open
					source et ma{' '}
					<span className="font-medium text-foreground">
						contribution active
					</span>{' '}
					à la communauté de développeurs web.
				</Prose>
			</PanelContent>

			<PanelContent>
				<Suspense fallback={<GraphFallback />}>
					<CommitsGraph contributions={contributions} />
				</Suspense>
			</PanelContent>

			<PanelContent className="screen-line-before">
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
