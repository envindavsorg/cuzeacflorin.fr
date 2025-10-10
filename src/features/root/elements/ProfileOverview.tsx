import {
	GenderFemaleIcon,
	GenderMaleIcon,
	GlobeIcon,
	MapPinIcon,
} from '@phosphor-icons/react/ssr';
import type React from 'react';
import { Panel, PanelContent } from '../../../components/ui/Panel';
import { USER } from '../data/user';
import { EmailItem } from './overview/EmailItem';
import { IntroItem } from './overview/IntroItem';
import { JobItem } from './overview/JobItem';
import { PhoneItem } from './overview/PhoneItem';
import { urlToName } from '../../../utils/url';

const ProfileOverview = (): React.JSX.Element => (
	<Panel>
		<h2 className="sr-only">Vue de base de mon profil</h2>

		<PanelContent className="flex flex-col gap-3">
			{USER.jobs.map((job, idx: number) => (
				<JobItem
					company={job.company}
					key={`${idx}-${job.company}`}
					title={job.title}
					website={job.website}
				/>
			))}

			<div className="grid max-sm:gap-3 sm:grid-cols-3">
				<PhoneItem phoneNumber={USER.phoneNumber} />
				<EmailItem email={USER.email} />
			</div>

			<div className="grid max-sm:gap-3 sm:grid-cols-3">
				<IntroItem content={USER.address} icon={MapPinIcon} />
				<IntroItem
					content={urlToName(USER.website)}
					href={USER.website}
					icon={GlobeIcon}
				/>
				<IntroItem
					content={USER.pronouns}
					icon={USER.gender === 'homme' ? GenderMaleIcon : GenderFemaleIcon}
				/>
			</div>
		</PanelContent>
	</Panel>
);

ProfileOverview.displayName = 'ProfileOverview';

export { ProfileOverview };
