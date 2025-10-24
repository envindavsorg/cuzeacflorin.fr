import type React from 'react';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/Panel';
import { Prose } from '@/components/Typography';
import { SOCIAL_LINKS } from '@/features/root/data/social-links';
import { ContactItem, type FollowerCounts } from './ContactItem';

export const Contact = ({
	githubFollowers,
	linkedinFollowers,
}: FollowerCounts): React.JSX.Element => (
	<Panel>
		<PanelHeader>
			<PanelTitle>Me contacter & réseaux sociaux</PanelTitle>
		</PanelHeader>

		<PanelContent className="screen-line-after py-2">
			<Prose className="text-muted-foreground">
				Vous avez un projet, une question ou simplement envie d'échanger ?
				N'hésitez pas à me contacter. Je suis également actif sur les réseaux
				sociaux où je partage mon actualité et mes découvertes techniques.
			</Prose>
		</PanelContent>

		<div className="relative">
			<div className="-z-1 pointer-events-none absolute inset-0 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
				<div className="border-edge border-r" />
				<div className="border-edge border-l" />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{SOCIAL_LINKS.map((link) => (
					<ContactItem
						key={link.href}
						{...link}
						githubFollowers={githubFollowers}
						linkedinFollowers={linkedinFollowers}
					/>
				))}
			</div>
		</div>
	</Panel>
);
