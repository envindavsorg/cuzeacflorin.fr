import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import type React from 'react';
import { metadata } from '@/app/(app)/(docs)/blog/metadata';
import { PostItem } from '@/blog/components/PostItem';
import { getPostsByCategory } from '@/blog/data/posts';
import { BlogItemsLength } from '@/blog/elements/BlogItemsLength';
import type { Post } from '@/blog/types/post';
import { Button } from '@/components/Button';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/Panel';
import { Prose } from '@/components/Typography';
import { dayjs } from '@/lib/dayjs';

export const Blog = (): React.JSX.Element => {
	const articles: Post[] = getPostsByCategory('article')
		.sort((a: Post, b: Post) =>
			dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
		)
		.slice(0, 4);

	return (
		<Panel id="blog">
			<PanelHeader className="flex items-center justify-between">
				<PanelTitle>{metadata.title}</PanelTitle>
				<BlogItemsLength items={articles} slug="article" />
			</PanelHeader>

			<PanelContent className="screen-line-after py-2">
				<Prose className="text-muted-foreground">{metadata.description}</Prose>
			</PanelContent>

			<div className="relative py-4">
				<div className="-z-1 pointer-events-none absolute inset-0 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
					<div className="border-edge border-r" />
					<div className="border-edge border-l" />
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{articles.map((post: Post) => (
						<PostItem key={post.slug} post={post} />
					))}
				</div>
			</div>

			<div className="screen-line-before flex justify-center py-2 md:justify-end md:pr-4">
				<Link aria-label="Voir tous les articles" href="/blog">
					<Button variant="default">
						Voir tous les articles
						<ArrowRightIcon className="size-4" />
					</Button>
				</Link>
			</div>
		</Panel>
	);
};
