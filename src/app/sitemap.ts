import type { MetadataRoute } from 'next';
import { getAllPosts, getPostsByCategory } from '@/blog/data/posts';
import { SITE_INFO } from '@/config/site';
import { dayjs } from '@/lib/dayjs';

const sitemap = (): MetadataRoute.Sitemap => {
	const posts = getAllPosts().map((post) => ({
		url: `${SITE_INFO.url}/blog/${post.slug}`,
		lastModified: dayjs(post.metadata.updatedAt).toISOString(),
	}));

	const components = getPostsByCategory('components').map((post) => ({
		url: `${SITE_INFO.url}/components/${post.slug}`,
		lastModified: dayjs(post.metadata.updatedAt).toISOString(),
	}));

	const routes = ['', '/blog', '/components'].map((route) => ({
		url: `${SITE_INFO.url}${route}`,
		lastModified: dayjs().toISOString(),
	}));

	return [...routes, ...posts, ...components];
};

export default sitemap;
