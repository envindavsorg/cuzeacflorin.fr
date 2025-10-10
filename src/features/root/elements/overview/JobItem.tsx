import { BriefcaseIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { IntroItem } from './IntroItem';

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
	<IntroItem
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

JobItem.displayName = 'JobItem';

export { JobItem };
