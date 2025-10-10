import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/post';
import { getAllProjects } from '@/lib/blog/project';
import { baseURL } from '@/resources/meta';

const sitemap = (): MetadataRoute.Sitemap => {
	const routes = [''].map((route) => ({
		url: `https://${baseURL}${route}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 1,
	}));

	const posts = getAllPosts().map((post) => ({
		url: `https://${baseURL}/posts/${post.slug}`,
		lastModified: post.metadata.date,
		changeFrequency: 'monthly' as const,
		priority: 1,
	}));

	const projects = getAllProjects().map((projects) => ({
		url: `https://${baseURL}/projects/${projects.slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 1,
	}));

	return [...routes, ...posts, ...projects];
};

export default sitemap;
