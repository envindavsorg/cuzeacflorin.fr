import { MDXRemote } from 'next-mdx-remote/rsc';
import type React from 'react';
import { createElement } from 'react';
import {
	CurrentDate,
	Today,
	TodayEnglish,
	TodayShort,
} from '@/components/mdx/CurrentDate';
import { toKebabCase } from '@/lib/utils';

const createHeading = (level: number) => {
	const Heading = ({ children }: { children: string }) => {
		const slug = toKebabCase(children);

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

export const CustomMDX = ({ ...props }): React.JSX.Element => (
	<MDXRemote
		{...props}
		components={{ ...components, ...(props.components || {}) }}
		source={props.source}
	/>
);
