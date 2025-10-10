import type React from 'react';
import { Markdown } from '../../../components/markdown/markdown';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '../../../components/ui/Panel';
import { Prose } from '../../../components/ui/Typography';
import { USER } from '../data/user';
import { ProfileAboutToggle } from './ProfileAboutToggle';

const ProfileAbout = (): React.JSX.Element => {
	const paragraphs = USER.about.trim().split('\n\n');
	const firstParagraph = paragraphs[0];
	const restParagraphs = paragraphs.slice(1).join('\n\n');

	return (
		<Panel id="about">
			<PanelHeader>
				<PanelTitle>Quelques mots sur moi</PanelTitle>
			</PanelHeader>

			<PanelContent className="!pb-0">
				<Prose>
					<Markdown>{firstParagraph}</Markdown>
					<ProfileAboutToggle>
						<Markdown>{restParagraphs}</Markdown>
					</ProfileAboutToggle>
				</Prose>
			</PanelContent>
		</Panel>
	);
};

ProfileAbout.displayName = 'ProfileAbout';

export { ProfileAbout };
