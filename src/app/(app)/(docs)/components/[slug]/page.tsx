import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { getTableOfContents } from 'fumadocs-core/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { BlogPosting as PageSchema, WithContext } from 'schema-dts';
import { LLMCopyButtonWithViewOptions } from '@/blog/actions/post.action';
import { PostKeyboardShortcuts } from '@/blog/components/PostKeyboardShortcuts';
import { PostShareMenu } from '@/blog/components/PostShareMenu';
import {
	findNeighbour,
	getPostBySlug,
	getPostsByCategory,
} from '@/blog/data/posts';
import { InlineToc } from '@/blog/elements/InlineToc';
import type { Post } from '@/blog/types/post';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { Prose } from '@/components/Typography';
import { SITE_INFO } from '@/config/site';
import { MDX } from '@/elements/markdown/mdx';
import { USER } from '@/features/root/data/user';
import { dayjs } from '@/lib/dayjs';
import { generateOgMetadata } from '@/lib/og-image';
import { cn } from '@/lib/utils';

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

export const generateStaticParams = async () => {
	const posts = getPostsByCategory('components');
	return posts.map((post) => ({
		slug: post.slug,
	}));
};

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const slug = (await params).slug;
	const post = getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	const { title, description } = post.metadata;
	const postUrl = `/components/${post.slug}`;

	const og = generateOgMetadata({
		title,
		description,
		ogImageParams: {
			type: 'componentsArticle',
			title,
			description,
		},
	});

	return {
		...og,
		alternates: {
			canonical: postUrl,
		},
	};
};

const getPageJsonLd = (post: Post): WithContext<PageSchema> => ({
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: post.metadata.title,
	description: post.metadata.description,
	image:
		post.metadata.imageLight ||
		`/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
	url: `${SITE_INFO.url}/components/${post.slug}`,
	datePublished: dayjs(post.metadata.createdAt).toISOString(),
	dateModified: dayjs(post.metadata.updatedAt).toISOString(),
	author: {
		'@type': 'Person',
		name: USER.displayName,
		identifier: USER.username,
		image: USER.avatar,
	},
});

const Page = async ({ params }: Props) => {
	const slug = (await params).slug;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	if (post.metadata.category !== 'components') {
		notFound();
	}

	const toc = getTableOfContents(post.content);
	const allPosts = getPostsByCategory('components');
	const { previous, next } = findNeighbour(allPosts, slug);

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(getPageJsonLd(post)).replace(/</g, '\\u003c'),
				}}
				type="application/ld+json"
			/>

			<PostKeyboardShortcuts
				basePath="/components"
				next={next}
				previous={previous}
			/>

			<div className="flex items-center justify-between p-2 pl-4">
				<Button
					asChild
					className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
					variant="link"
				>
					<Link href="/components">
						<ArrowLeftIcon className="size-4" />
						Tous les composants
					</Link>
				</Button>

				<div className="flex items-center gap-2">
					<LLMCopyButtonWithViewOptions
						isComponent
						markdownUrl={`/components/${post.slug}.mdx`}
					/>

					<PostShareMenu url={`/components/${post.slug}`} />

					{previous && (
						<Button asChild size="icon:sm" variant="secondary">
							<Link href={`/components/${previous.slug}`}>
								<ArrowLeftIcon className="size-4" />
								<span className="sr-only">Précédent</span>
							</Link>
						</Button>
					)}

					{next && (
						<Button asChild size="icon:sm" variant="secondary">
							<Link href={`/components/${next.slug}`}>
								<span className="sr-only">Suivant</span>
								<ArrowRightIcon className="size-4" />
							</Link>
						</Button>
					)}
				</div>
			</div>

			<div className="screen-line-before screen-line-after">
				<div
					className={cn(
						'h-8',
						'before:-left-[100vw] before:-z-1 before:absolute before:h-full before:w-[200vw]',
						'before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56'
					)}
				/>
			</div>

			<Prose className="px-4">
				<h1 className="screen-line-after mb-6 font-semibold">
					{post.metadata.title}
				</h1>

				<p className="lead my-6">{post.metadata.description}</p>

				<InlineToc items={toc} />

				<div>
					<MDX code={post.content} />
				</div>
			</Prose>

			<div className="screen-line-before w-full" />
			<Divider className="border-x-0" />
		</>
	);
};

export default Page;
