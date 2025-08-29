import { EyeIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { CustomMDX } from '@/components/mdx/Markdown';
import { Header } from '@/components/navigation/Header';
import { Button } from '@/components/ui/Button';
import type { MDXData, ProjectMetadata } from '@/lib/mdx';
import { getAllProjects } from '@/lib/projects';
import { cn, formatDate } from '@/lib/utils';

type Params = {
	slug: string;
};

export const generateStaticParams = async (): Promise<Params[]> =>
	getAllProjects().map(({ slug }) => ({ slug }));

type ProjectPageProps = {
	params: Promise<Params>;
};

const ProjectPage = async ({
	params,
}: Readonly<ProjectPageProps>): Promise<React.JSX.Element> => {
	const { slug } = await params;
	const project = getAllProjects().find(
		(project: MDXData<ProjectMetadata>) => project.slug === slug
	);

	if (!project) {
		notFound();
	}

	return (
		<div
			className={cn(
				'relative mx-auto w-full has-[button.group:hover]:*:last:translate-y-4',
				'max-w-[320px] sm:max-w-[375px] md:max-w-[800px] lg:max-w-[1200px]'
			)}
		>
			<Header />

			<main className="mx-auto mt-10 flex max-w-prose flex-col gap-y-10 transition-transform duration-700 ease-in-out">
				<section className="flex flex-col items-center justify-center gap-y-3">
					<h1
						className="inline-block text-center font-bold font-pixelify-sans text-3xl text-theme md:text-4xl"
						title={project.metadata.title}
					>
						{project.metadata.title}
					</h1>
					<div className="flex gap-x-2">
						<span className="text-muted-foreground text-sm">
							{formatDate(project.metadata.date)}
						</span>
						<span className="text-muted-foreground text-sm">•</span>
						<span className="text-muted-foreground text-sm">
							{project.reading?.readingTime}
						</span>
						<span className="text-muted-foreground text-sm">•</span>
						<span className="text-muted-foreground text-sm">
							{project.reading?.words} mots
						</span>
					</div>
					<div className="mt-6 flex flex-wrap items-center gap-3">
						{JSON.parse(project.metadata.links).map(
							(link: { url: string; name: string; type: string }) => (
								<Link
									href={link.url}
									key={link.url}
									rel="noreferrer nofollow noopener"
									target="_blank"
								>
									<Button size="lg" variant="outline">
										{link.type === 'demo' && <EyeIcon />}
										{link.type === 'github' && <GithubLogoIcon />}
										{link.name}
									</Button>
								</Link>
							)
						)}
					</div>
				</section>

				<article className="prose dark:prose-invert mt-3">
					<CustomMDX source={project.content} />
				</article>
			</main>
		</div>
	);
};

export default ProjectPage;
