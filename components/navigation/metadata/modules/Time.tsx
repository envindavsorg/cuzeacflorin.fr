import dayjs from 'dayjs';
import type React from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import type { MetadataProps } from '@/components/navigation/Metadata';
import { MetadataItem } from '@/components/navigation/metadata/Item';
import 'dayjs/locale/fr.js';

dayjs.locale('fr');

export const Time = ({ intersect }: MetadataProps): React.JSX.Element => (
	<MetadataItem title="Date actuelle :">
		<ScrambleText
			className="text-muted-foreground italic"
			text={dayjs().format('ddd DD MMM YYYY')}
			trigger={intersect}
		/>
	</MetadataItem>
);
