import type React from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import { MetadataItem } from '@/components/navigation/metadata/Item';
import type { MetadataProps } from '@/components/navigation/metadata/Metadata';
import { useBrowser } from '@/hooks/useBrowser';

export const Browser = ({ intersect }: MetadataProps): React.JSX.Element => {
	const { name: browserName, icon: BrowserIcon } = useBrowser();

	return (
		<MetadataItem title="Navigateur utilisé :">
			<div className="flex items-center gap-2">
				{BrowserIcon && <BrowserIcon className="size-4" />}
				<ScrambleText text={browserName} trigger={intersect} />
			</div>
		</MetadataItem>
	);
};

Browser.displayName = 'MetadataBrowser';
