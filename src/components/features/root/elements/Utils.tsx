import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import type React from 'react';
import { metadata } from '@/app/(app)/(docs)/utils/metadata';
import { getPostsByCategory } from '@/blog/data/posts';
import { BlogItemsLength } from '@/blog/elements/BlogItemsLength';
import type { Post } from '@/blog/types/post';
import { UtilsItem } from '@/components/features/root/elements/UtilsItem';
import { Button } from '@/components/ui/Button';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Prose } from '@/components/ui/Typography';
import { dayjs } from '@/lib/dayjs';

export const Utils = (): React.JSX.Element => {
	const utils: Post[] = getPostsByCategory('utils')
		.sort((a: Post, b: Post) =>
			dayjs(b.metadata.createdAt).diff(dayjs(a.metadata.createdAt))
		)
		.slice(0, 4);

	return (
		<Panel id="utils">
			<PanelHeader className="flex items-center justify-between">
				<PanelTitle>{metadata.title}</PanelTitle>
				<BlogItemsLength items={utils} slug="outil" />
			</PanelHeader>

			<PanelContent className="screen-line-after">
				<Prose className="text-muted-foreground">{metadata.description}</Prose>
			</PanelContent>

			<div className="relative">
				{utils.map((post: Post) => (
					<UtilsItem key={post.slug} post={post} />
				))}
			</div>

			<div className="screen-line-before flex justify-center py-2 md:justify-end md:pr-4">
				<Link aria-label="Voir tous les outils" href="/utils">
					<Button>
						Voir tous les outils
						<ArrowRightIcon />
					</Button>
				</Link>
			</div>
		</Panel>
	);
};
