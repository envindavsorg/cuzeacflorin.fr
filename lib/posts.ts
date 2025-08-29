import path from 'node:path';
import { getMDXData, type MDXData, type PostMetadata } from '@/lib/mdx';

export const getAllPosts = (): MDXData<PostMetadata>[] =>
	getMDXData<PostMetadata>(path.join(process.cwd(), 'content/posts'));

export const getLatestPost = (): MDXData<PostMetadata> => getAllPosts()[0];

export const getFirstPost = (): MDXData<PostMetadata> | undefined => {
	const posts = getAllPosts();
	return posts.at(-1);
};

export const getPostByIndex = (
	index: number
): MDXData<PostMetadata> | undefined => {
	const posts = getAllPosts();
	return posts[index];
};
