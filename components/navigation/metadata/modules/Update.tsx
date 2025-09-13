import type React from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import type { MetadataProps } from '@/components/navigation/Metadata';
import { MetadataItem } from '@/components/navigation/metadata/Item';
import { getCachedGitInfo } from '@/lib/git';

export const Update = async ({
	intersect,
}: MetadataProps): Promise<React.JSX.Element> => {
	const { date, timestamp } = await getCachedGitInfo();

	return (
		<MetadataItem title="Navigateur utilisé :">
			<div className="flex items-baseline gap-x-2">
				<ScrambleText
					className="text-muted-foreground italic"
					text={date}
					trigger={intersect}
				/>
				<ScrambleText
					className="font-medium text-theme text-xs italic min-lg:hidden"
					text={timestamp}
					trigger={intersect}
				/>
			</div>
		</MetadataItem>
	);
};
