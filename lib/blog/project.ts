import { join } from 'node:path';
import { type BaseMetadata, getMDXData, type MDXData } from '@/lib/blog/mdx';

let projectsCache: MDXData<ProjectMetadata>[] | null = null;
let projectsBySlugCache: Map<string, MDXData<ProjectMetadata>> | null = null;

const PROJECTS_DIR = join(process.cwd(), 'lib/blog/content/projects');

export interface ProjectMetadata extends BaseMetadata {
	date: string;
	links: string;
}

export const getAllProjects = (): MDXData<ProjectMetadata>[] => {
	if (projectsCache !== null) {
		return projectsCache;
	}

	projectsCache = getMDXData<ProjectMetadata>(PROJECTS_DIR);
	projectsCache.sort((a, b) => {
		const dateA = new Date(a.metadata.date).getTime();
		const dateB = new Date(b.metadata.date).getTime();
		return dateB - dateA;
	});

	return projectsCache;
};

export const getProjectBySlug = (
	slug: string
): MDXData<ProjectMetadata> | null => {
	if (projectsBySlugCache === null) {
		projectsBySlugCache = new Map();
		const projects = getAllProjects();

		for (const project of projects) {
			projectsBySlugCache.set(project.slug, project);
		}
	}

	return projectsBySlugCache.get(slug) || null;
};

export const clearProjectsCache = (): void => {
	projectsCache = null;
	projectsBySlugCache = null;
};
