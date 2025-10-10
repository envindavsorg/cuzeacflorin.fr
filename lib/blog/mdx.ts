import { type Dirent, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { cache } from 'react';
import readingDuration from 'reading-duration';
import {
	CONSECUTIVE_DIGITS_PATTERN,
	FRONTMATTER_REGEX,
	RAW_REGEX,
	WHITESPACE_SEPARATOR,
} from '@/lib/regex';

export type BaseMetadata = {
	title: string;
	description: string;
};

export type MDXData<T extends BaseMetadata> = {
	metadata: T;
	slug: string;
	content: string;
	reading?: {
		time: string;
		words: number;
	};
};

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

type ReadingTimeOnArticle = {
	time: string;
	minutes: number;
	words: number;
};

const readingTime = cache((content: string): ReadingTimeOnArticle => {
	if (!content?.trim()) {
		return { time: 'pas de lecture', minutes: 0, words: 0 };
	}

	const duration = readingDuration(content, {
		wordsPerMinute: 100,
		emoji: false,
	});
	const time = duration.replace('min read', 'min');
	const minutes = Number.parseInt(
		duration.match(CONSECUTIVE_DIGITS_PATTERN)?.[0] || '0',
		10
	);
	const words = content.trim().split(WHITESPACE_SEPARATOR).length;

	return { time, minutes, words };
});

export const getMDXData = <T extends BaseMetadata>(dir: string): MDXData<T>[] =>
	readdirSync(dir, {
		withFileTypes: true,
	})
		.filter(
			(dirent: Dirent) => dirent.isFile() && extname(dirent.name) === '.mdx'
		)
		.map(({ name }) => {
			const file = readFileSync(join(dir, name), 'utf-8');
			const { metadata, content } = parseFrontmatter<T>(file);
			const { time, words } = readingTime(content);

			return {
				metadata,
				slug: basename(name, extname(name)),
				content,
				reading: { time, words },
			};
		});
