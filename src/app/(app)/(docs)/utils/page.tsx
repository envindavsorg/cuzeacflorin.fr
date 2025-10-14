import { PaletteIcon, TextTIcon, VaultIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PostTagFilter } from '@/blog/components/PostTagFilter';
import { getPostsByCategory } from '@/blog/data/posts';
import type { Post } from '@/blog/types/post';
import { dayjs } from '@/lib/dayjs';

export const metadata: Metadata = {
	title: 'Outils web',
	description:
		'Différents outils pour les développeurs web, utiles dans la vie de tous les jours.',
};

type ComponentsPageProps = {
	searchParams: Promise<{
		tag?: string;
	}>;
};

const ComponentsPage = async ({
	searchParams,
}: Readonly<ComponentsPageProps>) => {
	const resolvedSearchParams = await searchParams;
	const utils: Post[] = getPostsByCategory('utils');

	const allTags = [
		'Tous les outils',
		...Array.from(
			new Set(utils.flatMap((article: Post) => article.metadata.tags || []))
		).sort(),
	];
	const selectedTag = resolvedSearchParams.tag || 'Tous les outils';
	const filteredComponents =
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
				<h1 className="font-semibold text-3xl sm:text-4xl">
					{String(metadata.title)}
				</h1>
			</div>

			<div className="screen-line-after border-edge border-t p-4">
				<p className="font-mono text-muted-foreground text-sm">
					{String(metadata.description)}
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

			<div className="min-h-svh">
				{filteredComponents
					.slice()
					.sort((a, b) =>
						dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
					)
					.map((post: Post, idx: number) => (
						<Link
							aria-label={post.metadata.title}
							className="group/post flex items-center border-edge border-b pr-4"
							href={`/utils/${post.slug}`}
							key={`${post.slug}-${idx}`}
						>
							<div
								aria-hidden
								className="mx-4 flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
							>
								{post.metadata.tags?.includes('Base64') && (
									<VaultIcon className="pointer-events-none size-5 text-muted-foreground" />
								)}
								{post.metadata.tags?.includes('Colors') && (
									<PaletteIcon className="pointer-events-none size-5 text-muted-foreground" />
								)}
								{post.metadata.tags?.includes('Texte') && (
									<TextTIcon className="pointer-events-none size-5 text-muted-foreground" />
								)}
							</div>

							<div className="border-edge border-l border-dashed p-4">
								<h2 className="text-balance font-medium leading-snug underline-offset-4 group-hover/post:underline">
									{post.metadata.title}
								</h2>
							</div>

							{post.metadata.new && (
								<span className="relative flex items-center justify-center">
									<span className="absolute inline-flex size-3 animate-ping rounded-full bg-theme opacity-50" />
									<span className="relative inline-flex size-2 rounded-full bg-theme" />
									<span className="sr-only">Nouveau</span>
								</span>
							)}
						</Link>
					))}
			</div>

			<div className="h-8" />
		</div>
	);
};

export default ComponentsPage;
