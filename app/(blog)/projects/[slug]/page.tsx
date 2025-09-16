import { EyeIcon, GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { CustomMDX } from '@/components/mdx/Markdown';
import { Button } from '@/components/ui/Button';
import { Paragraph } from '@/components/ui/Paragraph';
import type { MDXData, ProjectMetadata } from '@/lib/blog/mdx';
import { getAllProjects } from '@/lib/blog/project';
import { date } from '@/lib/dayjs';

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
		<section>
			<Paragraph className="text-left">
				<span className="md:!text-xl !text-base bg-gradient-to-t from-gray-900 to-gray-900/90 bg-clip-text font-normal text-transparent tracking-tight dark:from-gray-100 dark:to-gray-100/90">
					{project.metadata.title}
				</span>
				<span className="block" />
			</Paragraph>

			<div className="flex gap-x-3">
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					{date(project.metadata.date).format('ddd DD MMM YYYY')}
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					•
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					{project.reading?.time}
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					•
				</span>
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
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

			<article className="prose dark:prose-invert mt-6">
				<CustomMDX source={project.content} />
			</article>
		</section>
	);
};

export default ProjectPage;
