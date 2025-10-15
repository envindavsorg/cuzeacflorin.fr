import {
	ArrowRightIcon,
	GlobeIcon,
	PaletteIcon,
	TextTIcon,
	VaultIcon,
} from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import type React from 'react';
import { getPostsByCategory } from '@/blog/data/posts';
import type { Post } from '@/blog/types/post';
import { Button } from '@/components/ui/Button';
import { Panel, PanelHeader, PanelTitle } from '@/components/ui/Panel';
import { dayjs } from '@/lib/dayjs';

type UtilsLengthProps = {
	length: number;
};

const UtilsLength = ({ length }: UtilsLengthProps): React.JSX.Element => (
	<sup className="ml-1 select-none font-mono font-semibold text-sm text-theme">
		({length} outil{length > 1 ? 's' : ''})
	</sup>
);

export const Utils = (): React.JSX.Element => {
	const allPosts: Post[] = getPostsByCategory('utils');

	return (
		<Panel id="blog">
			<PanelHeader>
				<PanelTitle>
					Outils web <UtilsLength length={Number(allPosts.length)} />
				</PanelTitle>
			</PanelHeader>

			<div className="relative">
				{allPosts
					.slice()
					.sort((a, b) =>
						dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
					)
					.map((post: Post, idx: number) => (
						<Link
							aria-label={post.metadata.title}
							className="group/post flex items-center border-edge border-b pr-4 last:border-b-0"
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
								{post.metadata.tags?.includes('Couleurs') && (
									<PaletteIcon className="pointer-events-none size-5 text-muted-foreground" />
								)}
								{post.metadata.tags?.includes('Texte') && (
									<TextTIcon className="pointer-events-none size-5 text-muted-foreground" />
								)}
								{post.metadata.tags?.includes('Internet') && (
									<GlobeIcon className="pointer-events-none size-5 text-muted-foreground" />
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

			<div className="screen-line-before flex justify-center py-2">
				<Button asChild variant="default">
					<Link href="/utils">
						Tous les outils
						<ArrowRightIcon className="size-4" />
					</Link>
				</Button>
			</div>
		</Panel>
	);
};
