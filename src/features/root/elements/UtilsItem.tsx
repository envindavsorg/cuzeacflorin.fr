'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Prose } from '@/components/ui/Typography';
import { IsNew } from '@/features/blog/components/IsNew';
import { getIconForUtilsTags } from '@/lib/blog/utils/tags';
import { cn } from '@/lib/utils';

type UtilsItemProps = {
	post: Post;
};

export const UtilsItem = memo(({ post }: UtilsItemProps) => {
	const { metadata, slug } = post;
	const { title, tags, new: isNew } = metadata;
	const Icon = getIconForUtilsTags(tags);

	return (
		<Link aria-label={title} href={`/utils/${slug}`}>
			<article className="group/utils screen-line-after flex items-center pr-4 hover:bg-accent2">
				<div
					className={cn(
						'm-3 flex aspect-square size-8 shrink-0 items-center justify-center',
						'rounded-lg border border-edge bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background',
					)}
				>
					{Icon && (
						<Icon className="pointer-events-none size-5 text-theme" />
					)}
				</div>

				<Prose className="flex h-14 flex-1 items-center border-edge border-l px-3 underline-offset-4 group-hover/utils:underline">
					{title}
				</Prose>

				{isNew && <IsNew className="ms-auto" />}
			</article>
		</Link>
	);
});
