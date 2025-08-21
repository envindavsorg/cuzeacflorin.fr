import { notFound } from 'next/navigation';
import type React from 'react';
import { FaX } from 'react-icons/fa6';
import { Anchor } from '@/components/ui/Anchor';
import { CustomMDX } from '@/components/ui/Markdown';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () =>
	getAllPosts().map((post) => ({ slug: post.slug }));

type PostPageProps = {
	params: Params;
};

const PostPage = async ({
	params,
}: PostPageProps): Promise<React.JSX.Element> => {
	const { slug } = await params;

	const post = getAllPosts().find((post) => post.slug === slug);
	if (!post) {
		notFound();
	}

	return (
		<>
			<header className="flex items-center justify-center pt-10">
				<Anchor className="inline-flex hover:mb-6 hover:scale-125" href="/">
					<FaX />
					<div className="sr-only">Close</div>
				</Anchor>
			</header>
			<main className="mx-auto max-w-prose px-4 py-10">
				<section className="text-center">
					<h1 className="font-pixelify-sans text-3xl leading-relaxed">
						{post.metadata.title}
					</h1>
					<small className="mt-2 text-gray-600 dark:text-gray-400">
						<time dateTime={post.metadata.date}>
							{formatDate(post.metadata.date)}
						</time>
					</small>
				</section>
				<article className="prose dark:prose-invert px-4 py-8">
					<CustomMDX source={post.content} />
				</article>
			</main>
		</>
	);
};

export default PostPage;
