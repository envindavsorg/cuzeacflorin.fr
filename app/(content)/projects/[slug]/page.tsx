import { BookIcon, CalendarDotsIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type React from 'react';
import { CustomMDX } from '@/components/mdx/Markdown';
import { Header } from '@/components/navigation/Header';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getAllProjects } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () =>
	getAllProjects().map((project) => ({ slug: project.slug }));

type ProjectPageProps = {
	params: Params;
};

const ProjectPage = async ({
	params,
}: ProjectPageProps): Promise<React.JSX.Element> => {
	const { slug } = await params;

	const project = getAllProjects().find((project) => project.slug === slug);
	if (!project) {
		notFound();
	}

	return (
		<div className="py-15">
			<Header />

			<main className="relative">
				<Container as="article" className="mt-10 flex flex-col gap-y-10">
					<section className="flex flex-col items-center justify-center gap-y-3">
						<h1
							className="inline-block font-bold font-pixelify-sans text-3xl text-theme md:text-4xl"
							title={project.metadata.title}
						>
							{project.metadata.title}
						</h1>
						<div className="flex items-center gap-x-3 *:px-2 *:py-1.5">
							<Badge variant="outline">
								<CalendarDotsIcon />
								{formatDate(project.metadata.date)}
							</Badge>
							<Badge variant="outline">
								<BookIcon />
								{project.reading?.readingTime}
							</Badge>
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
