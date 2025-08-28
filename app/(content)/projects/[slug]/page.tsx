import Link from 'next/link';
import { notFound } from 'next/navigation';
import type React from 'react';
import { CustomMDX } from '@/components/mdx/Markdown';
import { Header } from '@/components/navigation/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import type { MDXData, ProjectMetadata } from '@/lib/mdx';
import { getAllProjects } from '@/lib/projects';
import { formatDate } from '@/lib/utils';

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
		<div className="py-15 has-[button:hover]:*:last:translate-y-4">
			<Header />

			<main className="relative transition-transform duration-700 ease-in-out">
				<Container as="article" className="mt-10 flex flex-col gap-y-10">
					<section className="flex flex-col items-center justify-center gap-y-3">
						<h1
							className="inline-block font-bold font-pixelify-sans text-3xl text-theme md:text-4xl"
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
					</section>

					<div className="grid grid-cols-2 gap-10 pb-8 max-md:grid-cols-1">
						<div className="top-6 flex flex-col gap-y-6 self-start rounded-lg border bg-background/80 p-6 backdrop-blur-sm md:sticky">
							<p className="font-medium leading-relaxed">
								{project.metadata.description}
							</p>
							<div className="flex flex-wrap items-center gap-3">
								{JSON.parse(project.metadata.links).map(
									(link: { url: string; name: string }) => (
										<Link
											href={link.url}
											key={link.url}
											rel="noreferrer nofollow noopener"
											target="_blank"
										>
											<Button size="lg" variant="outline">
												{link.name}
											</Button>
										</Link>
									)
								)}
							</div>
						</div>

						<div className="prose dark:prose-invert">
							<CustomMDX source={project.content} />
						</div>
					</div>
				</Container>
			</main>
		</div>
	);
};

export default ProjectPage;
