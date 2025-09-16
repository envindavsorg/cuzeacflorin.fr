import type React from 'react';
import { CardLink } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import type { PostMetadata } from '@/lib/blog/mdx';
import { date } from '@/lib/dayjs';

type BlogArticleProps = {
	metadata: PostMetadata;
	slug: string;
	reading: { time: string; words: number } | undefined;
};

export const BlogArticle = ({
	metadata,
	slug,
	reading,
}: BlogArticleProps): React.JSX.Element => {
	return (
		<>
			<CardLink
				className="absolute top-5 right-5"
				label="Lire l'article !"
				url={`/posts/${slug}`}
			/>

			<div className="flex flex-col items-start justify-between gap-y-3">
				<h2 className="w-full max-w-[14rem] font-archivo-black font-bold text-theme text-xl sm:max-w-xs md:text-2xl lg:max-w-full">
					{metadata.title}
				</h2>
				<Paragraph className="line-clamp-2 text-balance sm:line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
					{metadata.description}
				</Paragraph>
				<div className="mt-1 flex flex-row gap-x-3 gap-y-2 text-muted-foreground text-xs italic sm:flex-col md:flex-row md:text-sm">
					<span>{date(metadata.date).format('ddd DD MMM YYYY')}</span>
					<span className="inline-block sm:hidden md:inline-block">•</span>
					<span>
						{reading?.time}{' '}
						<span className="hidden sm:inline-block md:hidden lg:inline-block">
							de lecture
						</span>
					</span>
					<span className="inline-block sm:hidden md:inline-block">•</span>
					<span>{reading?.words} mots</span>
				</div>
			</div>
		</>
	);
};
