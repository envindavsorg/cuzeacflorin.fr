import { notFound } from 'next/navigation';
import type React from 'react';
import { CustomMDX } from '@/components/mdx/Markdown';
import { Header } from '@/components/navigation/Header';
import type { MDXData, PostMetadata } from '@/lib/mdx';
import { getAllPosts } from '@/lib/posts';
import { cn, formatDate } from '@/lib/utils';

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
		<div
			className={cn(
				'relative mx-auto w-full py-15 has-[button:hover]:*:last:translate-y-4',
				'max-w-[320px] sm:max-w-[375px] md:max-w-[800px] lg:max-w-[1200px]'
			)}
		>
			<Header />

			<main className="mx-auto mt-10 flex max-w-prose flex-col gap-y-10 transition-transform duration-700 ease-in-out">
				<section className="flex flex-col items-center justify-center gap-y-3">
					<h1
						className="inline-block text-center font-bold font-pixelify-sans text-3xl text-theme md:text-4xl"
						title={post.metadata.title}
					>
						{post.metadata.title}
					</h1>
					<div className="flex gap-x-2">
						<span className="text-muted-foreground text-sm">
							{formatDate(post.metadata.date)}
						</span>
						<span className="text-muted-foreground text-sm">•</span>
						<span className="text-muted-foreground text-sm">
							{post.reading?.readingTime}
						</span>
						<span className="text-muted-foreground text-sm">•</span>
						<span className="text-muted-foreground text-sm">
							{post.reading?.words} mots
						</span>
					</div>
				</section>

				<article className="prose dark:prose-invert mt-3">
					<CustomMDX source={post.content} />
				</article>
			</main>
		</div>
	);
};

export default PostPage;
