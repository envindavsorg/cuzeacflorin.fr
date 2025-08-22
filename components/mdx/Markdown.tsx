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
import {
	Marquee,
	MarqueeContent,
	MarqueeFade,
	MarqueeItem,
} from '@/components/ui/Marquee';
import { shikiOptions } from '@/lib/shiki';
import { cn, toKebabCase } from '@/lib/utils';
import { stack } from '@/resources/stack';

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

		return createElement(`h${level}`, { id: slug }, children);
	};

	Heading.displayName = `Heading${level}`;

	return Heading;
};

const stackIcons: React.JSX.Element[] = stack.map(
	({ icon: Icon, title }: Stack, index) => (
		<MarqueeItem key={`${title}-${index + 1}`}>
			<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800">
				<Icon className="size-7 shrink-0 md:size-8" />
				<p className="sr-only">{title}</p>
			</div>
		</MarqueeItem>
	)
);

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
	Stack: ({ className }: StackProps) => (
		<div className={cn('flex flex-col gap-y-4', className)}>
			<Marquee>
				<MarqueeFade side="left" />
				<MarqueeFade side="right" />
				<MarqueeContent direction="left">{stackIcons}</MarqueeContent>
			</Marquee>
			<Marquee>
				<MarqueeFade side="left" />
				<MarqueeFade side="right" />
				<MarqueeContent direction="right">{stackIcons}</MarqueeContent>
			</Marquee>
		</div>
	),
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
