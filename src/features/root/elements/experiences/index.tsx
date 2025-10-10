import type React from 'react';
import { Panel, PanelHeader, PanelTitle } from '../../../../components/ui/Panel';
import { EXPERIENCES } from '../../data/experiences';
import { ExperienceItem } from './ExperienceItem';

export const Experiences = (): React.JSX.Element => (
	<Panel id="experience">
		<PanelHeader>
			<PanelTitle>Mes expériences professionnelles</PanelTitle>
		</PanelHeader>

		<div className="pr-2 pl-4">
			{EXPERIENCES.map((experience) => (
				<ExperienceItem experience={experience} key={experience.id} />
			))}
		</div>
	</Panel>
);
