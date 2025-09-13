import dayjs from 'dayjs';
import type React from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import { MetadataItem } from '@/components/navigation/metadata/Item';
import type { MetadataProps } from '@/components/navigation/metadata/Metadata';
import 'dayjs/locale/fr.js';

dayjs.locale('fr');

export const Time = ({ intersect }: MetadataProps): React.JSX.Element => (
	<MetadataItem title="Date actuelle :">
		<ScrambleText
			text={dayjs().format('ddd DD MMM YYYY')}
			trigger={intersect}
		/>
	</MetadataItem>
);

Time.displayName = 'MetadataTime';
