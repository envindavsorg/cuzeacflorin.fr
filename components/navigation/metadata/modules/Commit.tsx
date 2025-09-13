import type React from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import type { MetadataProps } from '@/components/navigation/Metadata';
import { MetadataItem } from '@/components/navigation/metadata/Item';
import { getCachedGitInfo } from '@/lib/git';

export const Commit = async ({
	intersect,
}: MetadataProps): Promise<React.JSX.Element> => {
	const { hash, branch } = await getCachedGitInfo();

	return (
		<MetadataItem title="Dernier commit :">
			<div className="flex items-baseline gap-x-2">
				<ScrambleText
					className="text-muted-foreground italic"
					text={hash}
					trigger={intersect}
				/>
				<ScrambleText
					className="font-medium text-theme text-xs italic max-sm:hidden"
					text={branch}
					trigger={intersect}
				/>
			</div>
		</MetadataItem>
	);
};
