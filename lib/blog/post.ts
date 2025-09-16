import { join } from 'node:path';
import { getMDXData, type MDXData, type PostMetadata } from '@/lib/blog/mdx';

let postsCache: MDXData<PostMetadata>[] | null = null;
let postsBySlugCache: Map<string, MDXData<PostMetadata>> | null = null;

const POSTS_DIR = join(process.cwd(), 'content/posts');

export const getAllPosts = (): MDXData<PostMetadata>[] => {
	if (postsCache !== null) {
		return postsCache;
	}

	postsCache = getMDXData<PostMetadata>(POSTS_DIR);
	postsCache.sort((a, b) => {
		const dateA = new Date(a.metadata.date).getTime();
		const dateB = new Date(b.metadata.date).getTime();
		return dateB - dateA;
	});

	return postsCache;
};

export const getPostBySlug = (slug: string): MDXData<PostMetadata> | null => {
	if (postsBySlugCache === null) {
		postsBySlugCache = new Map();
		const posts = getAllPosts();

		for (const post of posts) {
			postsBySlugCache.set(post.slug, post);
		}
	}

	return postsBySlugCache.get(slug) || null;
};

export const clearPostsCache = (): void => {
	postsCache = null;
	postsBySlugCache = null;
};
