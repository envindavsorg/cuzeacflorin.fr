import type React from 'react';
import { AboutMeWidget } from '@/components/widgets/modules/AboutMe.widget';
import { ContactMe } from '@/components/widgets/modules/ContactMe';
import { GitHubCommits } from '@/components/widgets/modules/GitHubCommits';
import { GitHubStars } from '@/components/widgets/modules/GitHubStars';
import { LinkedInFollowers } from '@/components/widgets/modules/LinkedInFollowers';
import { MapLocation } from '@/components/widgets/modules/MapLocation';
import { MyJourney } from '@/components/widgets/modules/MyJourney';
import { PortfolioJourney } from '@/components/widgets/modules/PortfolioJourney';
import { ThemeSwitcher } from '@/components/widgets/modules/ThemeSwitcher';
import { TimeClock } from '@/components/widgets/modules/TimeClock';
import { WorkJourney } from '@/components/widgets/modules/WorkJourney';

type GridItem = {
	i: string;
	component: React.ComponentType;
};

export const gridItems: GridItem[] = [
	{ i: 'bio', component: AboutMeWidget },
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
