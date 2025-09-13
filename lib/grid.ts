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
	{ i: 'location', component: MapLocation },
	{ i: 'commit', component: GitHubCommits },
	{ i: 'stars', component: GitHubStars },
	{ i: 'linkedin', component: LinkedInFollowers },
	{ i: 'contact', component: ContactMe },
	{ i: 'portfolio', component: PortfolioJourney },
	{ i: 'work', component: WorkJourney },
	{ i: 'clock', component: TimeClock },
];
