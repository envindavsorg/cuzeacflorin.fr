import { BookIcon, CalendarDotsIcon } from '@phosphor-icons/react/ssr';
import { notFound } from 'next/navigation';
import type React from 'react';
import { CustomMDX } from '@/components/mdx/Markdown';
import { Header } from '@/components/navigation/Header';
import { Badge } from '@/components/ui/Badge';
import { getAllPosts } from '@/lib/posts';
import { cn, formatDate } from '@/lib/utils';

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
		<div
			className={cn(
				'relative mx-auto w-full py-15',
				'max-w-[320px] sm:max-w-[375px] md:max-w-[800px] lg:max-w-[1200px]'
			)}
		>
			<Header />

			<main className="mx-auto mt-10 flex max-w-prose flex-col gap-y-10">
				<section className="flex flex-col items-center justify-center gap-y-3">
					<h1
						className="inline-block text-center font-bold font-pixelify-sans text-3xl text-theme md:text-4xl"
						title={post.metadata.title}
					>
						{post.metadata.title}
					</h1>
					<div className="flex items-center gap-x-3 *:px-2 *:py-1.5">
						<Badge variant="outline">
							<CalendarDotsIcon />
							{formatDate(post.metadata.date)}
						</Badge>
						<Badge variant="outline">
							<BookIcon />
							{post.reading?.readingTime}
						</Badge>
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
