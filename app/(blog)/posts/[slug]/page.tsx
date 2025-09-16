import { notFound } from 'next/navigation';
import type React from 'react';
import type { MDXData, PostMetadata } from '@/blog/mdx';
import { getAllPosts } from '@/blog/post';
import { CustomMDX } from '@/components/mdx/Markdown';
import { Paragraph } from '@/components/ui/Paragraph';
import { date } from '@/lib/dayjs';

type Params = {
	slug: string;
};

export const generateStaticParams = async (): Promise<Params[]> =>
	getAllPosts().map(({ slug }) => ({ slug }));

type PostPageProps = {
	params: Promise<Params>;
};

const PostPage = async ({
	params,
}: Readonly<PostPageProps>): Promise<React.JSX.Element> => {
	const { slug } = await params;
	const post = getAllPosts().find(
		(post: MDXData<PostMetadata>) => post.slug === slug
	);

	if (!post) {
		notFound();
	}

	return (
		<section>
			<Paragraph className="text-left">
				<span className="md:!text-xl !text-base bg-gradient-to-t from-gray-900 to-gray-900/90 bg-clip-text font-normal text-transparent tracking-tight dark:from-gray-100 dark:to-gray-100/90">
					{post.metadata.title}
				</span>
				<span className="block" />
			</Paragraph>

			<div className="flex gap-x-3">
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					{date(post.metadata.date).format('ddd DD MMM YYYY')}
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					•
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					{post.reading?.time}
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					•
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					{post.reading?.words} mots
				</span>
			</div>

			<article className="prose dark:prose-invert mt-6">
				<CustomMDX source={post.content} />
			</article>
		</section>
	);
};

export default PostPage;
