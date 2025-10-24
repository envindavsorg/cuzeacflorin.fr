import type React from 'react';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/Panel';
import { Prose } from '@/components/Typography';
import { Markdown } from '@/elements/markdown/markdown';
import { USER } from '@/features/root/data/user';
import { AboutToggle } from './AboutToggle';

const About = (): React.JSX.Element => {
	const paragraphs = USER.about.trim().split('\n\n');
	const firstParagraph = paragraphs[0];
	const restParagraphs = paragraphs.slice(1).join('\n\n');

	return (
		<Panel id="about">
			<PanelHeader>
				<PanelTitle>Quelques mots sur moi</PanelTitle>
			</PanelHeader>

			<PanelContent className="!pb-0">
				<Prose className="text-muted-foreground">
					<Markdown>{firstParagraph}</Markdown>
					<AboutToggle>
						<Markdown>{restParagraphs}</Markdown>
					</AboutToggle>
				</Prose>
			</PanelContent>
		</Panel>
	);
};

export { About };
