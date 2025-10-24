import { BriefcaseIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { OverviewItem } from '@/features/root/elements/OverviewItem';

type JobItemProps = {
	title: string;
	company: string;
	website: string;
};

const JobItem = ({
	title,
	company,
	website,
}: JobItemProps): React.JSX.Element => (
	<OverviewItem
		content={
			<>
				{title} @
				<a
					className="ml-0.5 font-medium underline-offset-4 hover:underline"
					href={website}
					rel="noopener"
					target="_blank"
				>
					{company}
				</a>
			</>
		}
		icon={BriefcaseIcon}
	/>
);

export { JobItem };
