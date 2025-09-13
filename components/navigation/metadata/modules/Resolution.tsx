import { useWindowSize } from '@uidotdev/usehooks';
import type React from 'react';
import { useMemo } from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import type { MetadataProps } from '@/components/navigation/Metadata';
import { MetadataItem } from '@/components/navigation/metadata/Item';

export const Resolution = ({ intersect }: MetadataProps): React.JSX.Element => {
	const { width = 0, height = 0 } = useWindowSize();
	const dimensionsText = useMemo(
		() => `${width}x${height} pixels`,
		[width, height]
	);

	return (
		<MetadataItem title="Résolution écran :">
			<ScrambleText
				className="text-muted-foreground italic"
				text={dimensionsText}
				trigger={intersect}
			/>
		</MetadataItem>
	);
};
