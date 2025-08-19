import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Anchor } from '@/components/ui/Anchor';
import { Card } from '@/components/ui/Card';
import { cn, formatDate } from '@/lib/utils';
import { getLatestPost } from '@/utils/mdx';

export const GitHub = memo((): React.JSX.Element => {
	const post = getLatestPost();

	return (
		<Card
			className={cn(
				'relative justify-center gap-6 rounded-3xl px-8 py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<h2
				className="truncate font-pixelify-sans text-2xl"
				title={post.metadata.title}
			>
				<Link href={`/posts/${post.slug}`} className="cancel-drag">
					{post.metadata.title}
				</Link>
			</h2>
			<p className="line-clamp-3 leading-relaxed max-sm:line-clamp-2 max-md:line-clamp-4">
				{post.metadata.description}
			</p>
			<div className="inline-flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
				<Anchor
					className="cancel-drag px-4 py-2"
					href={`/posts/${post.slug}`}
				>
					<FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />{' '}
					Read More
					<span className="sr-only">{post.metadata.title}</span>
				</Anchor>
				<small className="text-gray-600 dark:text-gray-400">
					{formatDate(post.metadata.date)}
				</small>
			</div>
		</Card>
	);
});
