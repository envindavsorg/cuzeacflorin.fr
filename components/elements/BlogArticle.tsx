import type React from 'react';
import { CardLink } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import type { PostMetadata } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

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

			<div className="flex flex-col items-start justify-between gap-y-6 md:gap-y-3">
				<h2
					className="inline-block font-bold font-pixelify-sans text-3xl text-theme"
					title={metadata.title}
				>
					{metadata.title}
				</h2>
				<Paragraph className="relative line-clamp-3 leading-relaxed max-sm:line-clamp-2 md:line-clamp-6 lg:line-clamp-4">
					{metadata.description}
				</Paragraph>
				<div className="flex gap-x-2 md:mt-3">
					<span className="text-muted-foreground text-sm">
						{formatDate(metadata.date)}
					</span>
					<span className="text-muted-foreground text-sm">•</span>
					<span className="text-muted-foreground text-sm">
						{reading?.readingTime}
					</span>
					<span className="text-muted-foreground text-sm max-lg:hidden">•</span>
					<span className="text-muted-foreground text-sm max-lg:hidden">
						{reading?.words} mots
					</span>
				</div>
			</div>
		</>
	);
};
