import type { MetadataRoute } from 'next';
import { getAllPosts, getAllProjects } from '@/lib/mdx';
import { siteConfig } from '@/resources/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = [''].map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date(),
	}));

	const posts = getAllPosts().map((post) => ({
		url: `${siteConfig.url}/posts/${post.slug}`,
		lastModified: post.metadata.date,
	}));

	const projects = getAllProjects().map((projects) => ({
		url: `${siteConfig.url}/projects/${projects.slug}`,
		lastModified: new Date(),
	}));

	return [...routes, ...posts, ...projects];
}
