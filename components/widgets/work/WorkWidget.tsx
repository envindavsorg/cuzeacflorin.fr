import { CalendarDotsIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { Pattern } from '@/components/ui/Pattern';
import { ArticleLink } from '@/components/widgets/article/ArticleLink';
import { getFirstPost } from '@/lib/mdx';
import { cn, formatDate } from '@/lib/utils';

export const WorkWidget = memo((): React.JSX.Element => {
	const post = getFirstPost();

	return (
		<Card
			className={cn(
				'relative justify-center gap-y-4 rounded-3xl p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<h2
				className="inline-block font-bold font-pixelify-sans text-2xl text-theme md:text-3xl"
				title={post.metadata.title}
			>
				{post.metadata.title}
			</h2>
			<Paragraph className="relative line-clamp-3 leading-relaxed max-sm:line-clamp-2 max-md:line-clamp-4">
				{post.metadata.description}
			</Paragraph>

			<div className="mt-2 inline-flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
				<div className="flex items-center gap-x-2">
					<CalendarDotsIcon className="size-4.5" />
					<p className="text-sm md:text-base">
						{formatDate(post.metadata.date)}
					</p>
				</div>
				<ArticleLink label={post.metadata.title} url={`/posts/${post.slug}`} />
			</div>

			<Pattern />
		</Card>
	);
});
