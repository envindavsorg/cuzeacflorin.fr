import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React, { type ComponentPropsWithoutRef, createElement } from 'react';
import { toKebabCase } from '@/lib/utils';

type AnchorProps = ComponentPropsWithoutRef<'a'>;

const Anchor = ({
	href,
	children,
	...props
}: Readonly<AnchorProps>): React.JSX.Element => {
	const className = 'text-blue-500 hover:text-blue-700';

	if (href?.startsWith('/')) {
		return (
			<Link href={href} className={className} {...props}>
				{children}
			</Link>
		);
	}

	if (href?.startsWith('#')) {
		return (
			<a href={href} className={className} {...props}>
				{children}
			</a>
		);
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
			{...props}
		>
			{children}
		</a>
	);
};

const RoundedImage = ({ ...props }): React.JSX.Element => (
	<Image
		src={props.src}
		alt={props.alt}
		className="rounded-lg"
		draggable="false"
		{...props}
	/>
);

const createHeading = (level: number) => {
	const Heading = ({ children }: { children: string }) => {
		const slug = toKebabCase(children);
		return createElement(
			`h${level}`,
			{ id: slug },
			[
				createElement('a', {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: 'anchor',
				}),
			],
			children,
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
	Image: RoundedImage,
	a: Anchor,
};

export const CustomMDX = ({ ...props }): React.JSX.Element => (
	<MDXRemote
		{...props}
		source={props.source}
		components={{ ...components, ...(props.components || {}) }}
	/>
);
