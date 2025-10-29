import type React from 'react';
import type { Post } from '@/blog/types/post';
import type { Certification } from '@/components/features/root/data/certifications';
import type { Project } from '@/components/features/root/data/projects';

type BlogItemsLengthProps = {
	items: Post[] | Certification[] | Project[];
	slug: string;
};

export const BlogItemsLength = ({
	items,
	slug,
}: BlogItemsLengthProps): React.JSX.Element => (
	<span className="select-none font-mono text-theme text-xs sm:text-sm">
		({items.length} {slug}
		{items.length > 1 ? 's' : ''})
	</span>
);
