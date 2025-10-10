import type React from 'react';
import { Panel, PanelHeader, PanelTitle } from '@/components/ui/Panel';
import { CollapsibleList } from '@/features/root/components/CollapsibleList';
import { PROJECTS } from '@/features/root/data/projects';
import { ProjectItem } from './ProjectItem';

type ProjectsLengthProps = {
	length: number;
};

const ProjectsLength = ({ length }: ProjectsLengthProps): React.JSX.Element => (
	<sup className="ml-1 select-none font-mono font-semibold text-sm text-theme">
		({length} projet{length > 1 ? 's' : ''})
	</sup>
);

export const Projects = (): React.JSX.Element => (
	<Panel id="projects">
		<PanelHeader>
			<PanelTitle>
				Mes différents projets <ProjectsLength length={PROJECTS.length} />
			</PanelTitle>
		</PanelHeader>

		<CollapsibleList
			items={PROJECTS}
			max={4}
			renderItem={(item) => <ProjectItem project={item} />}
		/>
	</Panel>
);
