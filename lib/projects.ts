import path from 'node:path';
import { getMDXData, type MDXData, type ProjectMetadata } from '@/lib/mdx';

export const getAllProjects = (): MDXData<ProjectMetadata>[] =>
	getMDXData<ProjectMetadata>(path.join(process.cwd(), 'content/projects'));

export const getLatestProject = (): MDXData<ProjectMetadata> =>
	getAllProjects()[0];

export const getFirstProject = (): MDXData<ProjectMetadata> | undefined => {
	const projects = getAllProjects();
	return projects.at(-1);
};

export const getProjectByIndex = (
	index: number
): MDXData<ProjectMetadata> | undefined => {
	const projects = getAllProjects();
	return projects[index];
};
