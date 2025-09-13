import dayjs from 'dayjs';
import type React from 'react';
import 'dayjs/locale/fr.js';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ScrambleText } from '@/components/animation/ScrambleText';
import { MetadataItem } from '@/components/navigation/metadata/Item';
import type { MetadataProps } from '@/components/navigation/metadata/Metadata';
import { useGitInfo } from '@/hooks/useGitInfo';

dayjs.locale('fr');
dayjs.extend(relativeTime);

export const Update = ({ intersect }: MetadataProps): React.JSX.Element => {
	const { gitInfo } = useGitInfo();

	const relativeTime = gitInfo
		? `(${dayjs().to(dayjs(gitInfo.timestamp))})`
		: '';

	return (
		<MetadataItem title="Dernière mise à jour :">
			<div className="flex items-baseline gap-x-2">
				<ScrambleText text={gitInfo?.date || ''} trigger={intersect} />
				<ScrambleText
					className="!text-theme font-medium text-xs min-lg:hidden"
					text={relativeTime}
					trigger={intersect}
				/>
			</div>
		</MetadataItem>
	);
};

Update.displayName = 'MetadataUpdate';
