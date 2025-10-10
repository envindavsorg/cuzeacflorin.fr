import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { lazy } from 'react';
import type { Post } from '@/blog/types/post';
import { cn } from '@/lib/utils';
import 'dayjs/locale/fr.js';
import {
	BookBookmarkIcon,
	CalendarBlankIcon,
	ClockIcon,
} from '@phosphor-icons/react/ssr';
import { Tag } from '@/components/ui/Tag';
import { Prose } from '@/components/ui/Typography';

dayjs.locale('fr');

const ReactIcon = lazy(() =>
	import('@/components/icons/content/React').then((m) => ({
		default: m.ReactIcon,
	}))
);

type PostItemProps = {
	post: Post;
	shouldPreloadImage?: boolean;
};

export const PostItem = ({
	post,
	shouldPreloadImage,
}: PostItemProps): React.JSX.Element => (
	<Link
		className={cn(
			'group/post flex flex-col gap-2 p-2',
			'max-sm:screen-line-before max-sm:screen-line-after',
			'sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after'
		)}
		href={
			post.metadata.category === 'article'
				? `/blog/${post.slug}`
				: `/components/${post.slug}`
		}
	>
		{post.metadata.imageDark && post.metadata.imageLight && (
			<div className="relative select-none [&_img]:aspect-1200/630 [&_img]:rounded-xl">
				<Image
					alt={post.metadata.title}
					className="block dark:hidden"
					height={630}
					priority={shouldPreloadImage}
					quality={100}
					src={post.metadata.imageLight}
					unoptimized
					width={1200}
				/>
				<Image
					alt={post.metadata.title}
					className="hidden dark:block"
					height={630}
					priority={shouldPreloadImage}
					quality={100}
					src={post.metadata.imageDark}
					unoptimized
					width={1200}
				/>

				<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />

				{post.metadata.new && (
					<span className="absolute top-1.5 right-1.5 rounded-md bg-theme px-1.5 font-medium font-mono text-background text-shadow-xs text-xs">
						Nouveau
					</span>
				)}

				{post.metadata.tags?.includes('React') && (
					<ReactIcon
						aria-hidden
						className="absolute top-3.5 left-3.5 size-5 shrink-0"
					/>
				)}
			</div>
		)}

		<div className="flex flex-col gap-1 p-2">
			<h3 className="text-balance font-medium text-lg leading-snug underline-offset-4 group-hover/post:underline sm:text-xl">
				{post.metadata.title}
			</h3>
			<Prose className="text-muted-foreground text-sm sm:text-base">
				{post.metadata.description}
			</Prose>

			{post.metadata.category === 'article' && (
				<dl className="mt-2">
					<dt className="sr-only">Méta-données</dt>
					<dd className="flex gap-x-2 font-medium text-sm">
						<Tag className="flex items-center gap-x-1 text-foreground">
							<CalendarBlankIcon className="size-4" />
							<time dateTime={dayjs(post.metadata.createdAt).toISOString()}>
								{dayjs(post.metadata.createdAt).format('ddd DD MMM')}
							</time>
						</Tag>
						<Tag className="flex items-center gap-x-1 text-foreground">
							<ClockIcon className="size-4" />
							<span>{post.reading?.time}</span>
						</Tag>
						<Tag className="flex items-center gap-x-1 text-foreground">
							<BookBookmarkIcon className="size-4" />
							<span>{post.reading?.words} mots</span>
						</Tag>
					</dd>
				</dl>
			)}
		</div>
	</Link>
);
