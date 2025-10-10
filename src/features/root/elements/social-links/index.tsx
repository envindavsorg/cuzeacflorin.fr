import type React from 'react';
import { Panel, PanelHeader, PanelTitle } from '../../../../components/ui/Panel';
import { SOCIAL_LINKS } from '../../data/social-links';
import {
	type FollowerCounts,
	SocialLinksItem,
} from './SocialLinksItem';

const SocialLinks = ({
	githubFollowers,
	linkedinFollowers,
}: FollowerCounts): React.JSX.Element => (
	<Panel>
		<PanelHeader>
			<PanelTitle>Me contacter & réseaux sociaux</PanelTitle>
		</PanelHeader>

		<div className="relative">
			<div className="-z-1 pointer-events-none absolute inset-0 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
				<div className="border-edge border-r" />
				<div className="border-edge border-l" />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{SOCIAL_LINKS.map((link) => (
					<SocialLinksItem
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

SocialLinks.displayName = 'SocialLinks';

export { SocialLinks };
