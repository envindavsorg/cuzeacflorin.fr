import rehypeShiki from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React, { createElement } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import {
	CurrentDate,
	Today,
	TodayEnglish,
	TodayShort,
} from '@/components/mdx/CurrentDate';
import { shikiOptions } from '@/lib/shiki';
import { toKebabCase } from '@/lib/utils';

const getTextContent = (node: React.ReactNode): string => {
	if (typeof node === 'string') {
		return node;
	}
	if (typeof node === 'number') {
		return String(node);
	}
	if (Array.isArray(node)) {
		return node.map(getTextContent).join('');
	}
	if (React.isValidElement(node)) {
		const element = node as React.ReactElement<{ children?: React.ReactNode }>;
		if (element.props.children) {
			return getTextContent(element.props.children);
		}
	}
	return '';
};

const createHeading = (level: number) => {
	const Heading = ({ children }: { children: React.ReactNode }) => {
		const textContent = getTextContent(children);
		const slug = textContent ? toKebabCase(textContent) : '';

		const headingStyles = {
			1: 'text-4xl font-extrabold',
			2: 'text-3xl font-bold',
			3: 'text-2xl font-bold',
			4: 'text-xl font-semibold text-theme font-pixelify-sans',
			5: 'text-lg font-medium',
			6: 'text-base font-normal',
		};

		return createElement(
			`h${level}`,
			{
				id: slug,
				className: headingStyles[level as keyof typeof headingStyles],
			},
			children
		);
	};

	Heading.displayName = `Heading${level}`;

	return Heading;
};

const components = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	CurrentDate,
	Today,
	TodayShort,
	TodayEnglish,
};

export const CustomMDX = async ({ ...props }): Promise<React.JSX.Element> => {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
			options={{
				mdxOptions: {
					rehypePlugins: [
						rehypeSlug,
						[rehypeShiki, shikiOptions],
						[
							rehypeAutolinkHeadings,
							{
								behavior: 'wrap',
								properties: {
									className: ['anchor'],
								},
							},
						],
					],
				},
			}}
			source={props.source}
		/>
	);
};
