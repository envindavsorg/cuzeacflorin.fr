import type React from 'react';
import { AboutMe } from '@/components/widgets/AboutMe';
import { ContactMe } from '@/components/widgets/ContactMe';
import { GitHubCommits } from '@/components/widgets/GitHubCommits';
import { GitHubStars } from '@/components/widgets/GitHubStars';
import { LinkedInFollowers } from '@/components/widgets/LinkedInFollowers';
import { MapLocation } from '@/components/widgets/MapLocation';
import { MyJourney } from '@/components/widgets/MyJourney';
import { PortfolioJourney } from '@/components/widgets/PortfolioJourney';
import { ThemeSwitcher } from '@/components/widgets/ThemeSwitcher';
import { TimeClock } from '@/components/widgets/TimeClock';
import { WorkJourney } from '@/components/widgets/WorkJourney';

type GridItem = {
	i: string;
	component: React.ComponentType;
};

export const gridItems: GridItem[] = [
	{ i: 'bio', component: AboutMe },
	{ i: 'switcher', component: ThemeSwitcher },
	{ i: 'article', component: MyJourney },

	/*{ i: 'location', component: MapLocation },
	{ i: 'commit', component: GitHubCommits },
	{ i: 'stars', component: GitHubStars },
	{ i: 'linkedin', component: LinkedInFollowers },
	{ i: 'contact', component: ContactMe },
	{ i: 'portfolio', component: PortfolioJourney },
	{ i: 'work', component: WorkJourney },
	{ i: 'clock', component: TimeClock },*/
];

export const layouts = {
	all: {
		xl: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'switcher', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'article', x: 3, y: 0, w: 2, h: 1 },

			{ i: 'location', x: 2, y: 1, w: 2, h: 1 },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'linkedin', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 1 },
			{ i: 'stars', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'work', x: 2, y: 2, w: 2, h: 2 },
			{ i: 'contact', x: 4, y: 1, w: 1, h: 1 },
		],
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'switcher', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'article', x: 3, y: 0, w: 2, h: 1 },

			{ i: 'location', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'linkedin', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 1 },
			{ i: 'stars', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'work', x: 2, y: 2, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 4, w: 2, h: 2 },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'switcher', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'commit', x: 2, y: 1, w: 1, h: 1 },
			{ i: 'linkedin', x: 2, y: 2, w: 1, h: 1 },
			{ i: 'portfolio', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'stars', x: 2, y: 3, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 5, w: 2, h: 2 },
			{ i: 'work', x: 2, y: 4, w: 1, h: 1 },
			{ i: 'contact', x: 2, y: 5, w: 1, h: 1 },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'switcher', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'location', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'linkedin', x: 0, y: 5, w: 2, h: 2 },
			{ i: 'portfolio', x: 0, y: 7, w: 2, h: 2 },
			{ i: 'stars', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'article', x: 0, y: 11, w: 2, h: 2 },
			{ i: 'commit', x: 0, y: 13, w: 2, h: 2 },
			{ i: 'work', x: 0, y: 15, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 17, w: 2, h: 2 },
		],
	},
	about: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'linkedin', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 1 },
			{ i: 'stars', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'work', x: 2, y: 2, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 4, w: 2, h: 2 },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'commit', x: 2, y: 1, w: 1, h: 1 },
			{ i: 'clock', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'switcher', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'portfolio', x: 2, y: 2, w: 1, h: 1 },
			{ i: 'stars', x: 2, y: 3, w: 1, h: 1 },
			{ i: 'linkedin', x: 2, y: 4, w: 1, h: 1 },
			{ i: 'work', x: 0, y: 5, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 5, w: 1, h: 1 },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'switcher', x: 0, y: 14, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 14, w: 1, h: 1 },
			{ i: 'location', x: 0, y: 2, w: 2, h: 2 },
			{ i: 'linkedin', x: 0, y: 5, w: 2, h: 1 },
			{ i: 'portfolio', x: 0, y: 6, w: 2, h: 2 },
			{ i: 'stars', x: 0, y: 8, w: 2, h: 1 },
			{ i: 'article', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'commit', x: 0, y: 11, w: 2, h: 1 },
			{ i: 'work', x: 0, y: 12, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 3, w: 2, h: 2 },
		],
	},
	projects: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'location', x: 0, y: 3, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 3, w: 1, h: 1 },
			{ i: 'commit', x: 2, y: 0, w: 1, h: 1 },
			{ i: 'linkedin', x: 3, y: 0, w: 1, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'stars', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'work', x: 0, y: 1, w: 2, h: 1 },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1 },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'location', x: 2, y: 6, w: 2, h: 1 },
			{ i: 'commit', x: 2, y: 0, w: 2, h: 1 },
			{ i: 'clock', x: 2, y: 5, w: 1, h: 1 },
			{ i: 'switcher', x: 3, y: 5, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 6, w: 2, h: 2 },
			{ i: 'portfolio', x: 0, y: 3, w: 2, h: 3 },
			{ i: 'stars', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'linkedin', x: 2, y: 2, w: 2, h: 1 },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2 },
			{ i: 'contact', x: 2, y: 7, w: 2, h: 2 },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'switcher', x: 0, y: 8, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 8, w: 1, h: 1 },
			{ i: 'location', x: 0, y: 12, w: 2, h: 2 },
			{ i: 'linkedin', x: 0, y: 2, w: 2, h: 1 },
			{ i: 'portfolio', x: 0, y: 11, w: 2, h: 2 },
			{ i: 'stars', x: 0, y: 5, w: 2, h: 1 },
			{ i: 'article', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1 },
			{ i: 'work', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 14, w: 2, h: 2 },
		],
	},
	blog: {
		lg: [
			{ i: 'bio', x: 2, y: 3, w: 2, h: 1 },
			{ i: 'location', x: 0, y: 3, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 3, w: 1, h: 1 },
			{ i: 'commit', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'linkedin', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2 },
			{ i: 'stars', x: 3, y: 1, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 0, w: 2, h: 1 },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1 },
			{ i: 'work', x: 2, y: 0, w: 2, h: 1 },
			{ i: 'contact', x: 0, y: 1, w: 2, h: 1 },
		],
		md: [
			{ i: 'bio', x: 2, y: 3, w: 2, h: 2 },
			{ i: 'location', x: 0, y: 3, w: 2, h: 1 },
			{ i: 'commit', x: 2, y: 2, w: 2, h: 1 },
			{ i: 'clock', x: 0, y: 2, w: 1, h: 1 },
			{ i: 'switcher', x: 1, y: 2, w: 1, h: 1 },
			{ i: 'article', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'portfolio', x: 2, y: 0, w: 2, h: 3 },
			{ i: 'stars', x: 2, y: 5, w: 2, h: 1 },
			{ i: 'linkedin', x: 2, y: 6, w: 2, h: 1 },
			{ i: 'work', x: 0, y: 2, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 7, w: 2, h: 2 },
		],
		sm: [
			{ i: 'bio', x: 0, y: 9, w: 2, h: 2 },
			{ i: 'switcher', x: 0, y: 4, w: 1, h: 1 },
			{ i: 'clock', x: 1, y: 4, w: 1, h: 1 },
			{ i: 'location', x: 0, y: 12, w: 2, h: 2 },
			{ i: 'linkedin', x: 0, y: 5, w: 2, h: 1 },
			{ i: 'portfolio', x: 0, y: 2, w: 2, h: 2 },
			{ i: 'stars', x: 0, y: 8, w: 2, h: 1 },
			{ i: 'article', x: 0, y: 0, w: 2, h: 2 },
			{ i: 'commit', x: 0, y: 11, w: 2, h: 1 },
			{ i: 'work', x: 0, y: 3, w: 2, h: 2 },
			{ i: 'contact', x: 0, y: 14, w: 2, h: 2 },
		],
	},
};
