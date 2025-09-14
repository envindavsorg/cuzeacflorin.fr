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
	const { gitInfo, error } = useGitInfo();

	if (error || !gitInfo) {
		return (
			<MetadataItem title="Dernière mise à jour :">
				<div className="flex items-baseline gap-x-2">
					<ScrambleText text="Indisponible" trigger={intersect} />
					<ScrambleText
						className="!text-muted-foreground font-medium text-xs min-lg:hidden"
						text="(erreur)"
						trigger={intersect}
					/>
				</div>
			</MetadataItem>
		);
	}

	const relativeTimeText = gitInfo.timestamp
		? `(${dayjs().to(dayjs(gitInfo.timestamp))})`
		: '';

	return (
		<MetadataItem title="Dernière mise à jour :">
			<div className="flex items-baseline gap-x-2">
				<ScrambleText text={gitInfo.date} trigger={intersect} />
				<ScrambleText
					className="!text-theme font-medium text-xs min-lg:hidden"
					text={relativeTimeText}
					trigger={intersect}
				/>
			</div>
		</MetadataItem>
	);
};

Update.displayName = 'MetadataUpdate';
