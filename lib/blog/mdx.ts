import fs from 'node:fs';
import path from 'node:path';
import { readingTimeOnArticle } from '@/lib/blog/read';

type BaseMetadata = {
	title: string;
	description: string;
};

export interface PostMetadata extends BaseMetadata {
	date: string;
}

export interface ProjectMetadata extends BaseMetadata {
	date: string;
	links: string;
	images?: string;
}

export type MDXData<T extends BaseMetadata> = {
	metadata: T;
	slug: string;
	content: string;
	reading?: {
		time: string;
		words: number;
	};
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

export const getMDXData = <T extends BaseMetadata>(dir: string): MDXData<T>[] =>
	fs
		.readdirSync(dir, { withFileTypes: true })
		.filter((dirent) => dirent.isFile() && path.extname(dirent.name) === '.mdx')
		.map((dirent) => {
			const filePath = path.join(dir, dirent.name);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const { metadata, content } = parseFrontmatter<T>(fileContent);
			const { time, words } = readingTimeOnArticle(content, 'fr');

			return {
				metadata,
				slug: path.basename(dirent.name, path.extname(dirent.name)),
				content,
				reading: {
					time,
					words,
				},
			};
		});
