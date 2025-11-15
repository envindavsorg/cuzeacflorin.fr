import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Prose } from '@/components/ui/Typography';
import { PostsLength } from '@/features/blog/components/PostsLength';
import { CollapsibleList } from '@/features/root/components/CollapsibleList';
import { PROJECTS } from '@/features/root/data/projects';
import { ProjectsItem } from './ProjectsItem';

export const Projects = () => (
	<Panel id="projects">
		<PanelHeader className="flex items-center justify-between">
			<PanelTitle>Mes différents projets</PanelTitle>
			<PostsLength items={PROJECTS} slug="projet" />
		</PanelHeader>

		<PanelContent className="screen-line-after">
			<Prose className="text-muted-foreground">
				Une sélection de projets qui illustrent mon parcours et mes
				compétences. Du développement d'applications web modernes aux
				expérimentations techniques, chaque projet représente un défi
				relevé et des compétences acquises. Certains sont en production,
				d'autres sont des side-projects qui me permettent d'explorer de
				nouvelles technologies.
			</Prose>
		</PanelContent>

		<CollapsibleList
			items={PROJECTS}
			max={4}
			renderItem={(item) => <ProjectsItem project={item} />}
		/>
	</Panel>
);
