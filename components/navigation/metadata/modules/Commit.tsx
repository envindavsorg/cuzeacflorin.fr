import type React from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import { MetadataItem } from '@/components/navigation/metadata/Item';
import type { MetadataProps } from '@/components/navigation/metadata/Metadata';
import { useGitInfo } from '@/hooks/useGitInfo';

export const Commit = ({ intersect }: MetadataProps): React.JSX.Element => {
	const { gitInfo } = useGitInfo();

	return (
		<MetadataItem title="Dernier commit :">
			<div className="flex items-baseline gap-x-2">
				<ScrambleText text={gitInfo?.hash || ''} trigger={intersect} />
				<ScrambleText
					className="!text-theme font-medium text-xs max-sm:hidden"
					text={gitInfo ? `(branche ${gitInfo.branch})` : ''}
					trigger={intersect}
				/>
				<ScrambleText
					className="!text-theme font-medium text-xs min-sm:hidden"
					text={gitInfo ? `(${gitInfo.branch})` : ''}
					trigger={intersect}
				/>
			</div>
		</MetadataItem>
	);
};

Commit.displayName = 'MetadataCommit';
