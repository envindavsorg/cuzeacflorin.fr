import type React from 'react';
import { CardLink } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { date } from '@/lib/dayjs';
import type { PostMetadata } from '@/lib/mdx';

type BlogArticleProps = {
	metadata: PostMetadata;
	slug: string;
	reading:
		| {
				readingTime: string;
				words: number;
		  }
		| undefined;
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
				<h2 className="font-archivo-black font-bold text-2xl text-theme">
					{metadata.title}
				</h2>
				<Paragraph className="line-clamp-3 text-balance max-sm:line-clamp-2 md:line-clamp-6 lg:line-clamp-3">
					{metadata.description}
				</Paragraph>
				<div className="mt-1 flex gap-x-3 text-muted-foreground text-sm italic">
					<span>{date(metadata.date).format('ddd DD MMM YYYY')}</span>
					<span>•</span>
					<span>{reading?.readingTime} de lecture</span>
					<span className="max-lg:hidden">•</span>
					<span className="max-lg:hidden">{reading?.words} mots</span>
				</div>
			</div>
		</>
	);
};
