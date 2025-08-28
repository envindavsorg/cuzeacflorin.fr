import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import { baseURL } from '@/resources/meta';

const sitemap = (): MetadataRoute.Sitemap => {
	const routes = [''].map((route) => ({
		url: `${baseURL}${route}`,
		lastModified: new Date(),
	}));

	const posts = getAllPosts().map((post) => ({
		url: `${baseURL}/posts/${post.slug}`,
		lastModified: post.metadata.date,
	}));

	const projects = getAllProjects().map((projects) => ({
		url: `${baseURL}/projects/${projects.slug}`,
		lastModified: new Date(),
	}));

	return [...routes, ...posts, ...projects];
};

export default sitemap;
