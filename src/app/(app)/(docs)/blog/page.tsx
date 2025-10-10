import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { PostItem } from '../../../../blog/components/PostItem';
import { getPostsByCategory } from '../../../../blog/data/posts';
import type { Post } from '../../../../blog/types/post';
import 'dayjs/locale/fr.js';
import { PostTagFilter } from '../../../../blog/components/PostTagFilter';

dayjs.locale('fr');

export const metadata: Metadata = {
	title: 'Mes articles de blog',
	description:
		'Retrouvez tous mes articles de blog sur le développement web, les bonnes pratiques, et plus encore.',
};

type BlogArticlesPageProps = {
	searchParams: Promise<{
		tag?: string;
	}>;
};

const BlogArticlesPage = async ({
	searchParams,
}: Readonly<BlogArticlesPageProps>) => {
	const resolvedSearchParams = await searchParams;
	const articles: Post[] = getPostsByCategory('article');

	const allTags = [
		'Tous les articles',
		...Array.from(
			new Set(articles.flatMap((article: Post) => article.metadata.tags || []))
		).sort(),
	];
	const selectedTag = resolvedSearchParams.tag || 'Tous les articles';
	const filteredArticles =
		selectedTag === 'Tous les articles'
			? articles
			: articles.filter((article: Post) =>
					article.metadata.tags?.includes(selectedTag)
				);

	const tagCounts = allTags.reduce(
		(acc, tag) => {
			if (tag === 'Tous les articles') {
				acc[tag] = articles.length;
			} else {
				acc[tag] = articles.filter((article: Post) =>
					article.metadata.tags?.includes(tag)
				).length;
			}
			return acc;
		},
		{} as Record<string, number>
	);

	return (
		<div className="min-h-svh">
			<div className="screen-line-after px-4">
				<h1 className="font-semibold text-3xl sm:text-4xl">
					{String(metadata.title)}
				</h1>
			</div>

			<div className="screen-line-after p-4">
				<p className="text-balance font-mono text-muted-foreground text-sm">
					{metadata.description}
				</p>
			</div>

			<div className="screen-line-after p-4">
				{allTags.length > 0 && (
					<div className="mx-auto w-full max-w-7xl">
						<PostTagFilter
							selectedTag={selectedTag}
							tagCounts={tagCounts}
							tags={allTags}
						/>
					</div>
				)}
			</div>

			<div className="relative pt-4">
				<div className="-z-1 absolute inset-0 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
					<div className="border-edge border-r" />
					<div className="border-edge border-l" />
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{filteredArticles
						.slice()
						.sort((a, b) =>
							dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
						)
						.map((post: Post, idx: number) => (
							<PostItem
								key={post.slug}
								post={post}
								shouldPreloadImage={idx <= 4}
							/>
						))}
				</div>
			</div>

			<div className="h-8" />
		</div>
	);
};

export default BlogArticlesPage;
