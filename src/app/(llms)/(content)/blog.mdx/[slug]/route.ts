import { notFound } from 'next/navigation';
import { getAllPosts } from '@/blog/data/posts';
import { getLLMText } from '@/blog/lib/get-llm-text';
import type { Post } from '@/blog/types/post';

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
	const posts: Post[] = getAllPosts();
	return posts.map(({ slug }) => ({ slug }));
};

type ParamsProps = {
	params: Promise<{ slug: string }>;
};

export const GET = async (
	_request: Request,
	{ params }: ParamsProps
): Promise<Response> => {
	const { slug } = await params;

	const allPosts: Post[] = getAllPosts();
	const post = allPosts.find((post: Post) => post.slug === slug);

	if (!post) {
		notFound();
	}

	return new Response(await getLLMText(post), {
		headers: {
			'Content-Type': 'text/markdown;charset=utf-8',
		},
	});
};
