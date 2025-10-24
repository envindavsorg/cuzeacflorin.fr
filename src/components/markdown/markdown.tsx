import type React from 'react';
import { MarkdownAsync } from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { rehypeAddQueryParams } from '@/lib/rehype-add-query-params';

const Markdown = (
	props: React.ComponentProps<typeof MarkdownAsync>
): React.JSX.Element => (
	<MarkdownAsync
		rehypePlugins={[
			rehypeRaw,
			[
				rehypeExternalLinks,
				{ target: '_blank', rel: 'nofollow noopener noreferrer' },
			],
			[rehypeAddQueryParams],
		]}
		remarkPlugins={[remarkGfm]}
		{...props}
	/>
);

export { Markdown };
