import {
	GenderFemaleIcon,
	GenderMaleIcon,
	GlobeIcon,
	MapPinIcon,
} from '@phosphor-icons/react/ssr';
import type React from 'react';
import { Panel, PanelContent } from '@/components/ui/Panel';
import { USER } from '@/features/root/data/user';
import { urlToName } from '@/utils/url';
import { EmailItem } from './elements/EmailItem';
import { JobItem } from './elements/JobItem';
import { OverviewItem } from './elements/OverviewItem';
import { PhoneItem } from './elements/PhoneItem';

export const Overview = (): React.JSX.Element => (
	<Panel>
		<PanelContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
			{USER.jobs.map(({ company, title, website }, idx: number) => (
				<JobItem
					className="col-span-full"
					company={company}
					key={`${idx}-${company}`}
					title={title}
					website={website}
				/>
			))}

			<PhoneItem
				className="col-span-full sm:col-span-2"
				phoneNumber={USER.phoneNumber}
			/>

			<EmailItem className="col-span-full sm:col-span-2" email={USER.email} />

			<OverviewItem
				className="col-span-1"
				content={USER.address}
				icon={MapPinIcon}
			/>

			<OverviewItem
				className="col-span-1"
				content={urlToName(USER.website)}
				href={`https://${USER.website}`}
				icon={GlobeIcon}
			/>

			<OverviewItem
				className="col-span-1"
				content={USER.pronouns}
				icon={USER.gender === 'homme' ? GenderMaleIcon : GenderFemaleIcon}
			/>
		</PanelContent>
	</Panel>
);
