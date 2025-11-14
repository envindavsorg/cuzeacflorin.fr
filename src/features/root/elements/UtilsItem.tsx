'use client';

import {
	GlobeIcon,
	PaletteIcon,
	TextTIcon,
	VaultIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import type React from 'react';
import { PostIsNew } from '@/blog/components/PostIsNew';
import type { Post } from '@/blog/types/post';
import { cn } from '@/lib/utils';

const TAG_ICONS = {
	Base64: VaultIcon,
	Couleurs: PaletteIcon,
	Texte: TextTIcon,
	Internet: GlobeIcon,
} as const;

const getIconForTags = (tags?: string[]) => {
	const tag = tags?.find((t) => t in TAG_ICONS);
	return tag ? TAG_ICONS[tag as keyof typeof TAG_ICONS] : null;
};

type UtilsItemProps = {
	post: Post;
};

export const UtilsItem = ({ post }: UtilsItemProps): React.JSX.Element => {
	const { metadata, slug } = post;
	const { title, tags, new: isNew } = metadata;
	const Icon = getIconForTags(tags);

	return (
		<Link
			aria-label={title}
			className="flex items-center border-edge border-b pr-4"
			href={`/utils/${slug}`}
		>
			<div
				aria-hidden
				className={cn(
					'mx-4 flex size-8 shrink-0 items-center justify-center bg-muted',
					'rounded-lg border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background'
				)}
			>
				{Icon && (
					<Icon
						className="pointer-events-none size-5 text-theme"
						weight="duotone"
					/>
				)}
			</div>

			<h2 className="flex-1 text-balance border-edge border-l border-dashed p-4 font-medium text-base leading-snug sm:text-lg">
				{title}
			</h2>

			{isNew && <PostIsNew className="ms-auto" />}
		</Link>
	);
};
