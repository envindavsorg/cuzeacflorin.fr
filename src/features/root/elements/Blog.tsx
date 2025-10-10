import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import type React from 'react';
import { PostItem } from '../../../blog/components/PostItem';
import { getAllPosts } from '../../../blog/data/posts';
import type { Post } from '../../../blog/types/post';
import { Button } from '../../../components/ui/Button';
import { Panel, PanelHeader, PanelTitle } from '../../../components/ui/Panel';

type BlogPostsLengthProps = {
	length: number;
};

const BlogPostsLength = ({
	length,
}: BlogPostsLengthProps): React.JSX.Element => (
	<sup className="ml-1 select-none font-mono font-semibold text-sm text-theme">
		({length} articles)
	</sup>
);

export const Blog = (): React.JSX.Element => {
	const allPosts: Post[] = getAllPosts();

	return (
		<Panel id="blog">
			<PanelHeader>
				<PanelTitle>
					Mes articles de blog{' '}
					<BlogPostsLength length={Number(allPosts.length)} />
				</PanelTitle>
			</PanelHeader>

			<div className="relative py-4">
				<div className="-z-1 pointer-events-none absolute inset-0 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
					<div className="border-edge border-r" />
					<div className="border-edge border-l" />
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{allPosts.slice(0, 4).map((post) => (
						<PostItem key={post.slug} post={post} />
					))}
				</div>
			</div>

			<div className="screen-line-before flex justify-center py-2">
				<Button asChild variant="default">
					<Link href="/blog">
						Tous les articles
						<ArrowRightIcon className="size-4" />
					</Link>
				</Button>
			</div>
		</Panel>
	);
};
