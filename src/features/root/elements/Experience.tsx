import type React from 'react';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/Panel';
import { Prose } from '@/components/Typography';
import { EXPERIENCES } from '@/features/root/data/experiences';
import { ExperienceItem } from './ExperienceItem';

export const Experiences = (): React.JSX.Element => (
	<Panel id="experience">
		<PanelHeader>
			<PanelTitle>Mes expériences</PanelTitle>
		</PanelHeader>

		<PanelContent className="screen-line-after py-2">
			<Prose className="text-muted-foreground">
				Retour sur mon parcours professionnel et les expériences qui m'ont
				permis de grandir en tant que développeur. De la refonte d'applications
				à grande échelle à l'intégration de fonctionnalités complexes, chaque
				poste a été une opportunité d'apprendre, de relever des défis techniques
				et de collaborer avec des équipes talentueuses.
			</Prose>
		</PanelContent>

		<div className="pr-2 pl-4">
			{EXPERIENCES.map((experience) => (
				<ExperienceItem experience={experience} key={experience.id} />
			))}
		</div>
	</Panel>
);
