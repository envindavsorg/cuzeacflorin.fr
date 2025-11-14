import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { BlogPosting as PageSchema, WithContext } from 'schema-dts';
import { metadata } from '@/app/(app)/(docs)/utils/metadata';
import { PostIsNew } from '@/blog/components/PostIsNew';
import { PostKeyboardShortcuts } from '@/blog/components/PostKeyboardShortcuts';
import { PostShareMenu } from '@/blog/components/PostShareMenu';
import {
	findNeighbour,
	getPostBySlug,
	getPostsByCategory,
} from '@/blog/data/posts';
import type { Post } from '@/blog/types/post';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Prose } from '@/components/ui/Typography';
import { SITE_INFO } from '@/config/site';
import { MDX } from '@/elements/markdown/mdx';
import { USER } from '@/features/root/data/user';
import { dayjs } from '@/lib/dayjs';
import { openGraphImage } from '@/lib/open-graph';

const { type } = metadata;

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

export const generateStaticParams = async () => {
	const posts: Post[] = getPostsByCategory(type);
	return posts.map(({ slug }) => ({ slug }));
};

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	const { title, description } = post.metadata;
	const postUrl = `/utils/${post.slug}`;

	const og = openGraphImage({
		title,
		description,
		ogImageParams: { type: 'utilsArticle', title, description },
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
	url: `${SITE_INFO.url}/utils/${post.slug}`,
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
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const { category } = post.metadata;
	if (category !== type) {
		notFound();
	}

	const allPosts: Post[] = getPostsByCategory(type);
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
				basePath="/utils"
				next={next}
				previous={previous}
			/>

			<div className="screen-line-after flex items-center justify-between p-2 pl-4">
				<Button
					asChild
					className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
					variant="link"
				>
					<Link href="/utils">
						<ArrowLeftIcon className="size-4" />
						Tous les outils
					</Link>
				</Button>

				<div className="flex items-center gap-2">
					<PostShareMenu url={`/utils/${post.slug}`} />

					{previous && (
						<Button asChild size="icon:sm" variant="secondary">
							<Link href={`/utils/${previous.slug}`}>
								<ArrowLeftIcon className="size-4" />
								<span className="sr-only">Précédent</span>
							</Link>
						</Button>
					)}

					{next && (
						<Button asChild size="icon:sm" variant="secondary">
							<Link href={`/utils/${next.slug}`}>
								<span className="sr-only">Suivant</span>
								<ArrowRightIcon className="size-4" />
							</Link>
						</Button>
					)}
				</div>
			</div>

			<Divider />

			<div className="screen-line-after flex items-center justify-between px-3">
				<h1 className="font-semibold text-2xl sm:text-3xl">
					{post.metadata.title}
				</h1>
				{post.metadata.new && <PostIsNew />}
			</div>

			<div className="px-3 py-1.5">
				<Prose>{post.metadata.description}</Prose>
			</div>

			<Prose className="px-3">
				<MDX code={post.content} />
			</Prose>

			<div className="screen-line-before w-full" />
			<Divider className="border-x-0" />
		</>
	);
};

export default Page;
