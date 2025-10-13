import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { getTableOfContents } from 'fumadocs-core/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { BlogPosting as PageSchema, WithContext } from 'schema-dts';
import { LLMCopyButtonWithViewOptions } from '@/blog/actions/post.action';
import { PostKeyboardShortcuts } from '@/blog/components/PostKeyboardShortcuts';
import { PostShareMenu } from '@/blog/components/PostShareMenu';
import { findNeighbour, getAllPosts, getPostBySlug } from '@/blog/data/posts';
import { InlineToc } from '@/blog/elements/InlineToc';
import type { Post } from '@/blog/types/post';
import { MDX } from '@/components/markdown/mdx';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Prose } from '@/components/ui/Typography';
import { SITE_INFO } from '@/config/site';
import { USER } from '@/features/root/data/user';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';

type Props = {
	params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
	const posts = getAllPosts();
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

	const { title, description, imageLight, createdAt, updatedAt } =
		post.metadata;

	const postUrl = getPostUrl(post);
	const ogImage = imageLight || `/og/simple?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		alternates: {
			canonical: postUrl,
		},
		openGraph: {
			url: postUrl,
			type: 'article',
			publishedTime: dayjs(createdAt).toISOString(),
			modifiedTime: dayjs(updatedAt).toISOString(),
			images: {
				url: ogImage,
				width: 1200,
				height: 630,
				alt: title,
			},
		},
		twitter: {
			card: 'summary_large_image',
			images: [ogImage],
		},
	};
};

const getPostUrl = (post: Post) => {
	const isComponent = post.metadata.category === 'components';
	return isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`;
};

const getPageJsonLd = (post: Post): WithContext<PageSchema> => ({
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: post.metadata.title,
	description: post.metadata.description,
	image:
		post.metadata.imageLight ||
		`/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
	url: `${SITE_INFO.url}${getPostUrl(post)}`,
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

	const toc = getTableOfContents(post.content);

	const allPosts = getAllPosts();
	const { previous, next } = findNeighbour(allPosts, slug);

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(getPageJsonLd(post)).replace(/</g, '\\u003c'),
				}}
				type="application/ld+json"
			/>

			<PostKeyboardShortcuts basePath="/blog" next={next} previous={previous} />

			<div className="flex items-center justify-between p-2 pl-4">
				<Button
					asChild
					className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
					variant="link"
				>
					<Link href="/blog">
						<ArrowLeftIcon className="size-4" />
						Tous les articles
					</Link>
				</Button>

				<div className="flex items-center gap-2">
					<LLMCopyButtonWithViewOptions
						isComponent={post.metadata.category === 'components'}
						markdownUrl={`${getPostUrl(post)}.mdx`}
					/>

					<PostShareMenu url={getPostUrl(post)} />

					{previous && (
						<Button asChild size="icon:sm" variant="secondary">
							<Link href={`/blog/${previous.slug}`}>
								<ArrowLeftIcon className="size-4" />
								<span className="sr-only">Précédent</span>
							</Link>
						</Button>
					)}

					{next && (
						<Button asChild size="icon:sm" variant="secondary">
							<Link href={`/blog/${next.slug}`}>
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
				<h1 className="screen-line-after mb-1 font-semibold">
					{post.metadata.title}
				</h1>

				<div className="screen-line-after flex gap-x-2 pb-1 text-muted-foreground text-sm">
					<time dateTime={dayjs(post.metadata.createdAt).toISOString()}>
						{dayjs(post.metadata.createdAt).format('dddd DD MMMM YYYY')}
					</time>
					<span>•</span>
					<span>{post.reading?.time}</span>
					<span>•</span>
					<span>{post.reading?.words} mots</span>
				</div>

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
