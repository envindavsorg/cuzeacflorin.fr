import type React from 'react';
import { USER } from '@/components/features/root/data/user';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Prose } from '@/components/ui/Typography';
import { Markdown } from '@/elements/markdown/markdown';
import { AboutToggle } from './AboutToggle';

export const About = (): React.JSX.Element => {
	const paragraphs = USER.about.trim().split('\n\n');
	const firstParagraph = paragraphs[0];
	const restParagraphs = paragraphs.slice(1).join('\n\n');

	return (
		<Panel id="about">
			<PanelHeader>
				<PanelTitle>Quelques mots sur moi</PanelTitle>
			</PanelHeader>

			<PanelContent className="!pb-0 *:text-muted-foreground">
				<Prose>
					<Markdown>{firstParagraph}</Markdown>
					<AboutToggle>
						<Markdown>{restParagraphs}</Markdown>
					</AboutToggle>
				</Prose>
			</PanelContent>
		</Panel>
	);
};
