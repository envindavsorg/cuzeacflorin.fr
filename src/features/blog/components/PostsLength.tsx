import type { Certification } from '@/features/root/data/certifications';
import type { Project } from '@/features/root/data/projects';

type PostsLengthProps = {
	items: Post[] | Certification[] | Project[];
	slug: string;
};

export const PostsLength = ({ items, slug }: PostsLengthProps) => (
	<span className="select-none font-mono text-theme text-xs sm:text-sm">
		({items.length} {slug}
		{items.length > 1 ? 's' : ''})
	</span>
);
