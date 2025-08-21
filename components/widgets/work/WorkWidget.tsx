import { BookIcon, CalendarDotsIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { memo } from 'react';
import { Badge } from '@/components/ui/Badge';
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

			<div className="flex flex-col gap-1.5 *:px-2 *:py-1.5 md:flex-row md:items-center md:gap-3">
				<Badge variant="outline">
					<CalendarDotsIcon />
					{formatDate(post.metadata.date)}
				</Badge>
				<Badge variant="outline">
					<BookIcon />
					{post.reading?.readingTime}
				</Badge>
			</div>

			<ArticleLink
				className="absolute right-5 bottom-5"
				label={post.metadata.title}
				url={`/posts/${post.slug}`}
			/>

			<Pattern />
		</Card>
	);
});
