import fs from 'node:fs';
import path from 'node:path';

type BaseMetadata = {
	title: string;
	description: string;
};

interface PostMetadata extends BaseMetadata {
	date: string;
}

interface ProjectMetadata extends BaseMetadata {
	links: string;
	images?: string;
}

type MDXData<T extends BaseMetadata> = {
	metadata: T;
	slug: string;
	content: string;
};

const FRONTMATTER_REGEX = /^---\s*([\s\S]*?)\s*---/;
const RAW_REGEX = /^['"](.*)['"]$/;

const parseFrontmatter = <T extends BaseMetadata>(
	fileContent: string
): MDXData<T> => {
	const match = FRONTMATTER_REGEX.exec(fileContent);
	if (!match) {
		throw new Error('Invalid frontmatter');
	}

	const [fullMatch, frontMatterBlock] = match;
	const content = fileContent.slice(fullMatch.length).trim();
	const rawMetadata = Object.fromEntries(
		frontMatterBlock
			.trim()
			.split('\n')
			.map((line) => {
				const [key, ...valueParts] = line.split(':');
				const value = valueParts.join(':').trim().replace(RAW_REGEX, '$1');
				return [key.trim(), value];
			})
	);

	const metadata = rawMetadata as unknown as T;

	return { metadata, content, slug: '' };
};

const getMDXData = <T extends BaseMetadata>(dir: string): MDXData<T>[] =>
	fs
		.readdirSync(dir, { withFileTypes: true })
		.filter((dirent) => dirent.isFile() && path.extname(dirent.name) === '.mdx')
		.map((dirent) => {
			const filePath = path.join(dir, dirent.name);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const { metadata, content } = parseFrontmatter<T>(fileContent);
			return {
				metadata,
				slug: path.basename(dirent.name, path.extname(dirent.name)),
				content,
			};
		});

export const getAllPosts = (): MDXData<PostMetadata>[] =>
	getMDXData<PostMetadata>(path.join(process.cwd(), 'content/posts'));

export const getLatestPost = (): MDXData<PostMetadata> => getAllPosts()[0];

export const getAllProjects = (): MDXData<ProjectMetadata>[] =>
	getMDXData<ProjectMetadata>(path.join(process.cwd(), 'content/projects'));
