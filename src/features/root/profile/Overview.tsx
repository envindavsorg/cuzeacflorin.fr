import {
	GenderFemaleIcon,
	GenderMaleIcon,
	GlobeIcon,
	MapPinIcon,
} from '@phosphor-icons/react/ssr';
import type React from 'react';
import { Panel, PanelContent } from '@/components/ui/Panel';
import { EmailItem } from '@/features/root/components/EmailItem';
import { JobItem } from '@/features/root/components/JobItem';
import { PhoneItem } from '@/features/root/components/PhoneItem';
import { USER } from '@/features/root/data/user';
import { OverviewItem } from '@/features/root/profile/OverviewItem';
import { urlToName } from '@/utils/url';

export const Overview = (): React.JSX.Element => (
	<Panel>
		<h2 className="sr-only">Vue de base de mon profil</h2>

		<PanelContent className="flex flex-col gap-3">
			{USER.jobs.map(({ company, title, website }, idx: number) => (
				<JobItem
					company={company}
					key={`${idx}-${company}`}
					title={title}
					website={website}
				/>
			))}

			<div className="grid max-sm:gap-3 sm:grid-cols-3">
				<PhoneItem phoneNumber={USER.phoneNumber} />
				<EmailItem email={USER.email} />
			</div>

			<div className="grid max-sm:gap-3 sm:grid-cols-3">
				<OverviewItem content={USER.address} icon={MapPinIcon} />
				<OverviewItem
					content={urlToName(USER.website)}
					href={USER.website}
					icon={GlobeIcon}
				/>
				<OverviewItem
					content={USER.pronouns}
					icon={USER.gender === 'homme' ? GenderMaleIcon : GenderFemaleIcon}
				/>
			</div>
		</PanelContent>
	</Panel>
);
