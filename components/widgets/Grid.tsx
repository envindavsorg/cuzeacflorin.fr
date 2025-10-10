import type React from 'react';
import { getGitHubUserData } from '@/actions/github.action';
import { getLinkedInFollowers } from '@/actions/linkedin.action';
import { Motion } from '@/components/motion/Motion';
import { AboutMe } from '@/components/widgets/AboutMe';
import { ContactMe } from '@/components/widgets/ContactMe';
import { DevJourney } from '@/components/widgets/DevJourney';
import { GitHubStats } from '@/components/widgets/GitHubStats';
import { LinkedInStats } from '@/components/widgets/LinkedInStats';
import { MapLocation } from '@/components/widgets/MapLocation';
import { MyPortfolio } from '@/components/widgets/MyPortfolio';
import { WorkJourney } from '@/components/widgets/WorkJourney';
import { getPostBySlug } from '@/lib/blog/post';
import { getProjectBySlug } from '@/lib/blog/project';

export const WidgetGrid = async (): Promise<React.JSX.Element> => {
	const aboutBlogPost = getPostBySlug('how-its-started');
	const workBlogPost = getPostBySlug('work-and-always-work');
	const portfolioProject = getProjectBySlug('my-portfolio-project');
	const {
		status,
		stars,
		contributions: { totalContributions },
		followers,
	} = await getGitHubUserData();
	const { count } = await getLinkedInFollowers();

	return (
		<Motion
			animate="visible"
			asChild
			variants={{
				visible: {
					transition: {
						delayChildren: 0.25,
						staggerChildren: 0.1,
					},
				},
			}}
		>
			<div className="mt-6 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<AboutMe />
				{aboutBlogPost && <DevJourney post={aboutBlogPost} />}
				{workBlogPost && <WorkJourney post={workBlogPost} />}
				<MapLocation />
				{portfolioProject && <MyPortfolio project={portfolioProject} />}
				<GitHubStats
					commits={totalContributions}
					followers={followers}
					stars={stars}
					status={status}
				/>
				<LinkedInStats followers={count} />
				<ContactMe />
			</div>
		</Motion>
	);
};

WidgetGrid.displayName = 'WidgetGrid';
