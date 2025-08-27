import type React from 'react';
import { ArticleWidget } from '@/components/widgets/article/ArticleWidget';
import { BioWidget } from '@/components/widgets/bio/BioWidget';
import { ClockWidget } from '@/components/widgets/clock/ClockWidget';
import { ContactWidget } from '@/components/widgets/contact/ContactWidget';
import { CvWidget } from '@/components/widgets/cv/CvWidget';
import { GitHubCommits } from '@/components/widgets/GitHubCommits';
import { GitHubStars } from '@/components/widgets/GitHubStars';
import { LinkedInFollowers } from '@/components/widgets/LinkedInFollowers';
import { LocationWidget } from '@/components/widgets/location/LocationWidget';
import { PortfolioWidget } from '@/components/widgets/portfolio/PortfolioWidget';
import { SwitcherWidget } from '@/components/widgets/switcher/SwitcherWidget';
import { WorkWidget } from '@/components/widgets/work/WorkWidget';

type GridItem = {
	i: string;
	component: React.ComponentType;
};

export const gridItems: GridItem[] = [
	{ i: 'bio', component: BioWidget },
	{ i: 'location', component: LocationWidget },
	{ i: 'cv', component: CvWidget },
	{ i: 'commit', component: GitHubCommits },
	{ i: 'stars', component: GitHubStars },
	{ i: 'article', component: ArticleWidget },
	{ i: 'switcher', component: SwitcherWidget },
	{ i: 'linkedin', component: LinkedInFollowers },
	{ i: 'contact', component: ContactWidget },
	{ i: 'portfolio', component: PortfolioWidget },
	{ i: 'work', component: WorkWidget },
	{ i: 'clock', component: ClockWidget },
];

export const layouts: any = {
	all: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'cv', x: 3, y: 1, w: 1, h: 0.5 },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 0.5 },
			{ i: 'stars', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'commit', x: 0, y: 1, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'linkedin', x: 1, y: 0, w: 1, h: 1 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'work', x: 0, y: 3, w: 2, h: 1 },
			// is good
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 0, w: 2, h: 2 },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 2, y: 1, w: 1, h: 1 },
			{ i: 'stars', x: 0, y: 3, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'switcher', x: 3, y: 2, w: 2, h: 1 },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 1 },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2 },
			{ i: 'portfolio', x: 2, y: 1, w: 2, h: 2 },
			{ i: 'work', x: 0, y: 3, w: 2, h: 2 },
			// is good
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 0, y: 2, w: 2, h: 1.5 },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1 },
			{ i: 'stars', x: 0, y: 6, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1 },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1 },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1 },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2 },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2 },
			// is good
		],
	},
	about: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'cv', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'clock', x: 2, y: 3, w: 1, h: 1 },
			{ i: 'commit', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'linkedin', x: 3, y: 4, w: 1, h: 1 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'contact', x: 0, y: 1, w: 2, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'work', x: 0, y: 3, w: 2, h: 1 },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 0, w: 2, h: 1 },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 3, y: 2, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 2 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 2 },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2 },
		],
		sm: [
			{ i: 'location', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'bio', x: 0, y: 2, w: 2, h: 2 },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1.25 },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1 },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1.25 },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2 },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2 },
		],
	},
	projects: {
		lg: [
			{ i: 'bio', x: 0, y: 3, w: 2, h: 1 },
			{ i: 'location', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'cv', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 0, w: 1, h: 1 },
			{ i: 'commit', x: 0, y: 1, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'linkedin', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'work', x: 0, y: 0, w: 2, h: 1 },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 0, w: 2, h: 1 },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 3, y: 2, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 2 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 2 },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2 },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1.25 },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1 },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1.25 },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2 },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2 },
		],
	},
	blog: {
		lg: [
			{ i: 'bio', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'location', x: 0, y: 3, w: 1, h: 1 },
			{ i: 'cv', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 3, w: 1, h: 1 },
			{ i: 'commit', x: 0, y: 1, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'linkedin', x: 1, y: 0, w: 1, h: 1 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'work', x: 2, y: 0, w: 2, h: 1 },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 0, w: 2, h: 1 },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 3, y: 2, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 2 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 2 },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2 },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1 },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1.25 },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1 },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1.25 },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2 },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2 },
		],
	},
};
