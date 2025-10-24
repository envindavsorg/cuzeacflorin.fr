import { FileIcon, WrenchIcon } from '@phosphor-icons/react/ssr';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type React from 'react';
import { lazy } from 'react';
import rehypeExternalLinks from 'rehype-external-links';
import type { LineElement } from 'rehype-pretty-code';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { Code, Heading } from '@/components/Typography';
import { Base64 } from '@/elements/markdown/elements/Base64';
import { CodeBlockCommand } from '@/elements/markdown/elements/CodeBlockCommand';
import { CodeCollapsibleWrapper } from '@/elements/markdown/elements/CodeCollapsibleWrapper';
import { CodeTabs } from '@/elements/markdown/elements/CodeTabs';
import { ColorGenerator } from '@/elements/markdown/elements/ColorGenerator';
import { ComponentPreview } from '@/elements/markdown/elements/ComponentPreview';
import { ComponentSource } from '@/elements/markdown/elements/ComponentSource';
import { CopyButton } from '@/elements/markdown/elements/CopyButton';
import { FramedImage, YouTubeEmbed } from '@/elements/markdown/elements/Embed';
import { InternetSpeedTest } from '@/elements/markdown/elements/InternetSpeedTest';
import { LoremIpsumGenerator } from '@/elements/markdown/elements/LoremIpsumGenerator';
import { rehypeAddQueryParams } from '@/lib/rehype-add-query-params';
import { rehypeComponent } from '@/lib/rehype-component';
import { rehypeNpmCommand } from '@/lib/rehype-npm-command';
import { remarkCodeImport } from '@/lib/remark-code-import';
import { cn } from '@/lib/utils';
import type { NpmCommands } from '@/types/unist';

const JSONIcon = lazy(() =>
	import('../icons/content/JSON').then((m) => ({
		default: m.JSONIcon,
	}))
);

const CSSIcon = lazy(() =>
	import('../icons/content/CSS').then((m) => ({
		default: m.CSSIcon,
	}))
);

const JavaScriptIcon = lazy(() =>
	import('../icons/content/JavaScript').then((m) => ({
		default: m.JavaScriptIcon,
	}))
);

const TypeScriptIcon = lazy(() =>
	import('../icons/content/TypeScript').then((m) => ({
		default: m.TypeScriptIcon,
	}))
);

const ReactIcon = lazy(() =>
	import('../icons/content/React').then((m) => ({
		default: m.ReactIcon,
	}))
);

const ShadcnIcon = lazy(() =>
	import('../icons/content/Shadcn').then((m) => ({
		default: m.ShadcnIcon,
	}))
);

const getIconForLanguageExtension = (language: string) => {
	switch (language) {
		case 'json':
			return <JSONIcon />;
		case 'css':
			return <CSSIcon />;
		case 'js':
			return <JavaScriptIcon />;
		case 'ts':
		case 'typescript':
			return <TypeScriptIcon />;
		case 'jsx':
		case 'tsx':
			return <ReactIcon />;
		default:
			return <FileIcon />;
	}
};

const components: MDXRemoteProps['components'] = {
	h1: (props: React.ComponentProps<'h1'>) => <Heading as="h1" {...props} />,
	h2: (props: React.ComponentProps<'h2'>) => <Heading as="h2" {...props} />,
	h3: (props: React.ComponentProps<'h3'>) => <Heading as="h3" {...props} />,
	h4: (props: React.ComponentProps<'h4'>) => <Heading as="h4" {...props} />,
	h5: (props: React.ComponentProps<'h5'>) => <Heading as="h5" {...props} />,
	h6: (props: React.ComponentProps<'h6'>) => <Heading as="h6" {...props} />,
	table: Table,
	thead: TableHeader,
	tbody: TableBody,
	tr: TableRow,
	th: TableHead,
	td: TableCell,
	figure({ className, ...props }: React.ComponentProps<'figure'>) {
		const hasPrettyCode = 'data-rehype-pretty-code-figure' in props;

		return (
			<figure
				className={cn(hasPrettyCode && 'not-prose', className)}
				{...props}
			/>
		);
	},
	figcaption: ({ children, ...props }: React.ComponentProps<'figcaption'>) => {
		const iconExtension =
			'data-language' in props && typeof props['data-language'] === 'string'
				? getIconForLanguageExtension(props['data-language'])
				: null;

		return (
			<figcaption {...props}>
				{iconExtension}
				{children}
			</figcaption>
		);
	},
	pre({
		__withMeta__,
		__rawString__,
		__pnpm__,
		__yarn__,
		__npm__,
		__bun__,
		...props
	}: React.ComponentProps<'pre'> & {
		__withMeta__?: boolean;
		__rawString__?: string;
	} & NpmCommands) {
		const isNpmCommand = __pnpm__ && __yarn__ && __npm__ && __bun__;

		if (isNpmCommand) {
			return (
				<CodeBlockCommand
					__bun__={__bun__}
					__npm__={__npm__}
					__pnpm__={__pnpm__}
					__yarn__={__yarn__}
				/>
			);
		}

		return (
			<>
				<pre {...props} />

				{__rawString__ && (
					<CopyButton
						className="absolute top-2 right-2"
						value={__rawString__}
					/>
				)}
			</>
		);
	},
	code: Code,
	ComponentPreview,
	ComponentSource,
	CodeCollapsibleWrapper,
	CodeTabs,
	Steps: (props) => (
		<div
			className="prose-h3:text-wrap md:ml-3.5 md:border-l md:pl-7.5"
			{...props}
		/>
	),
	Step: ({ className, ...props }: React.ComponentProps<'h3'>) => (
		<h3 className={cn('step', className)} {...props} />
	),
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	TabsListInstallType: () => (
		<TabsList>
			<TabsTrigger value="cli">
				<ShadcnIcon />
				avec le CLI shadcn
			</TabsTrigger>

			<TabsTrigger value="manual">
				<WrenchIcon />
				manuellement
			</TabsTrigger>
		</TabsList>
	),
	YouTubeEmbed,
	FramedImage,
	Base64Component: Base64,
	ColorGeneratorComponent: ColorGenerator,
	LoremIpsumGeneratorComponent: LoremIpsumGenerator,
	InternetSpeedTestComponent: InternetSpeedTest,
};

const options: MDXRemoteProps['options'] = {
	mdxOptions: {
		remarkPlugins: [remarkGfm, remarkCodeImport],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{ target: '_blank', rel: 'nofollow noopener noreferrer' },
			],
			rehypeSlug,
			rehypeComponent,
			() => (tree) => {
				visit(tree, (node) => {
					if (node?.type === 'element' && node?.tagName === 'pre') {
						const [codeEl] = node.children;
						if (codeEl.tagName !== 'code') {
							return;
						}

						node.__rawString__ = codeEl.children?.[0].value;
					}
				});
			},
			[
				rehypePrettyCode,
				{
					theme: {
						dark: 'github-dark',
						light: 'github-light',
					},
					keepBackground: false,
					onVisitLine(node: LineElement) {
						if (node.children.length === 0) {
							node.children = [{ type: 'text', value: ' ' }];
						}
					},
				},
			],
			() => (tree) => {
				visit(tree, (node) => {
					if (node?.type === 'element' && node?.tagName === 'figure') {
						if (!('data-rehype-pretty-code-figure' in node.properties)) {
							return;
						}

						const preElement = node.children.at(-1);
						if (preElement.tagName !== 'pre') {
							return;
						}

						preElement.properties.__withMeta__ =
							node.children.at(0).tagName === 'figcaption';
						preElement.properties.__rawString__ = node.__rawString__;
					}
				});
			},
			rehypeNpmCommand,
			[rehypeAddQueryParams],
		],
	},
};

export const MDX = ({ code }: { code: string }): React.JSX.Element => (
	<MDXRemote components={components} options={options} source={code} />
);
