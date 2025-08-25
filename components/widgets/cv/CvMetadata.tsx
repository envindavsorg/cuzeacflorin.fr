import type React from 'react';
import { Spinner } from '@/components/ui/Spinner';

type CvMetadataProps = {
	metadata?: {
		sizeKB: number;
		lastModified: string;
	};
	isLoading?: boolean;
};

export const CvMetadata = ({
	metadata,
	isLoading = false,
}: CvMetadataProps): React.JSX.Element => {
	if (isLoading) {
		return <Spinner className="size-4" variant="default" />;
	}

	if (!metadata) {
		return <p className="text-xl uppercase lg:text-2xl">découvrez</p>;
	}

	return <p className="text-xl uppercase lg:text-2xl">{metadata.sizeKB}kb</p>;
};
