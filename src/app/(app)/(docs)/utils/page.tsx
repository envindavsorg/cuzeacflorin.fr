import type { Metadata } from 'next';
import { metadata } from '@/app/(app)/(docs)/utils/metadata';
import { PostTagFilter } from '@/blog/components/PostTagFilter';
import { getPostsByCategory } from '@/blog/data/posts';
import type { Post } from '@/blog/types/post';
import { Prose } from '@/components/ui/Typography';
import { UtilsItem } from '@/features/root/elements/UtilsItem';
import { dayjs } from '@/lib/dayjs';
import { generateOgMetadata } from '@/lib/og-image';

export const generateMetadata = async (): Promise<Metadata> =>
	generateOgMetadata({
		title: 'Outils web',
		description: 'Différents outils pour les développeurs web.',
		ogImageParams: {
			type: 'utils',
			title: 'Outils web',
			description: 'Différents outils pour les développeurs web.',
		},
	});

type ComponentsPageProps = {
	searchParams: Promise<{
		tag?: string;
	}>;
};

const ComponentsPage = async ({
	searchParams,
}: Readonly<ComponentsPageProps>) => {
	const resolvedSearchParams = await searchParams;
	const utils: Post[] = getPostsByCategory('utils').sort((a: Post, b: Post) =>
		dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
	);

	const allTags = [
		'Tous les outils',
		...Array.from(
			new Set(utils.flatMap((article: Post) => article.metadata.tags || []))
		).sort(),
	];
	const selectedTag = resolvedSearchParams.tag || 'Tous les outils';
	const filteredUtils =
		selectedTag === 'Tous les outils'
			? utils
			: utils.filter((article: Post) =>
					article.metadata.tags?.includes(selectedTag)
				);

	const tagCounts = allTags.reduce(
		(acc, tag) => {
			if (tag === 'Tous les outils') {
				acc[tag] = utils.length;
			} else {
				acc[tag] = utils.filter((article: Post) =>
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
				<h1 className="font-semibold text-3xl sm:text-4xl">{metadata.title}</h1>
			</div>

			<div className="screen-line-after border-edge border-t p-4">
				<Prose className="text-muted-foreground">{metadata.description}</Prose>
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

			<div className="min-h-svh">
				{filteredUtils.map((post: Post) => (
					<UtilsItem key={post.slug} post={post} />
				))}
			</div>

			<div className="h-8" />
		</div>
	);
};

export default ComponentsPage;
