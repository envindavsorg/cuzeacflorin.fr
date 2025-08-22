import type React from 'react';
import type { Layout } from 'react-grid-layout';
import { ArticleWidget } from '@/components/widgets/article/ArticleWidget';
import { BioWidget } from '@/components/widgets/bio/BioWidget';
import { ClockWidget } from '@/components/widgets/clock/ClockWidget';
import { CommitWidget } from '@/components/widgets/commit/CommitWidget';
import { ContactWidget } from '@/components/widgets/contact/ContactWidget';
import { CvWidget } from '@/components/widgets/cv/CvWidget';
import { LinkedInWidget } from '@/components/widgets/linkedin/LinkedInWidget';
import { LocationWidget } from '@/components/widgets/location/LocationWidget';
import { PortfolioWidget } from '@/components/widgets/portfolio/PortfolioWidget';
import { SwitcherWidget } from '@/components/widgets/switcher/SwitcherWidget';
import { WorkWidget } from '@/components/widgets/work/WorkWidget';

type GridItem = {
	i: string;
	component: React.ComponentType;
	category: 'about' | 'projects' | 'media' | 'all';
};

export const gridItems: GridItem[] = [
	{ i: 'bio', component: BioWidget, category: 'about' },
	{ i: 'location', component: LocationWidget, category: 'about' },
	{ i: 'cv', component: CvWidget, category: 'about' },
	{ i: 'commit', component: CommitWidget, category: 'projects' },
	{ i: 'article', component: ArticleWidget, category: 'media' },
	{ i: 'switcher', component: SwitcherWidget, category: 'all' },
	{ i: 'linkedin', component: LinkedInWidget, category: 'about' },
	{ i: 'contact', component: ContactWidget, category: 'about' },
	{ i: 'portfolio', component: PortfolioWidget, category: 'projects' },
	{ i: 'work', component: WorkWidget, category: 'projects' },
	{ i: 'clock', component: ClockWidget, category: 'all' },
];

type Layouts = 'lg' | 'md' | 'sm';

export const layouts: any = {
	all: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'linkedin', x: 1, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 3, w: 2, h: 1, isResizable: false },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 2, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2, isResizable: false },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 0, y: 2, w: 2, h: 1.5, isResizable: false },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1.25, isResizable: false },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1.25, isResizable: false },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2, isResizable: false },
		],
	},
	about: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'linkedin', x: 1, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 3, w: 2, h: 1, isResizable: false },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 2, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2, isResizable: false },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 0, y: 2, w: 2, h: 1.5, isResizable: false },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1.25, isResizable: false },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1.25, isResizable: false },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2, isResizable: false },
		],
	},
	projects: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'linkedin', x: 1, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 3, w: 2, h: 1, isResizable: false },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 2, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2, isResizable: false },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 0, y: 2, w: 2, h: 1.5, isResizable: false },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1.25, isResizable: false },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1.25, isResizable: false },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2, isResizable: false },
		],
	},
	media: {
		lg: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 1, w: 1, h: 1, isResizable: false },
			{ i: 'article', x: 0, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'linkedin', x: 1, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 1, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 3, w: 2, h: 1, isResizable: false },
		],
		md: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 2, y: 0, w: 2, h: 1, isResizable: false },
			{ i: 'cv', x: 3, y: 0, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 3, y: 2, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 2, w: 2, h: 2, isResizable: false },
			{ i: 'switcher', x: 3, y: 2, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'article', x: 0, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 2, y: 3, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
			{ i: 'work', x: 2, y: 3, w: 2, h: 2, isResizable: false },
		],
		sm: [
			{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
			{ i: 'location', x: 0, y: 2, w: 2, h: 1.5, isResizable: false },
			{ i: 'cv', x: 1, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'clock', x: 1, y: 5, w: 2, h: 1, isResizable: false },
			{ i: 'commit', x: 0, y: 6, w: 2, h: 1.25, isResizable: false },
			{ i: 'switcher', x: 0, y: 3, w: 1, h: 1, isResizable: false },
			{ i: 'linkedin', x: 0, y: 3, w: 2, h: 1.25, isResizable: false },
			{ i: 'article', x: 0, y: 8, w: 2, h: 2, isResizable: false },
			{ i: 'contact', x: 0, y: 9, w: 2, h: 2, isResizable: false },
			{ i: 'portfolio', x: 0, y: 4, w: 2, h: 2, isResizable: false },
			{ i: 'work', x: 0, y: 10, w: 2, h: 2, isResizable: false },
		],
	},
};

const projectLargeLayout: Layout[] = [
	{ i: 'images-1', x: 0, y: 0, w: 2, h: 1 },
	{ i: 'images-2', x: 2, y: 0, w: 1, h: 1 },
	{ i: 'images-3', x: 3, y: 0, w: 1, h: 2 },
	{ i: 'images-4', x: 0, y: 1, w: 1, h: 1 },
	{ i: 'images-5', x: 1, y: 1, w: 2, h: 1 },
];

export const projectLayouts: { [key in Layouts]: Layout[] } = {
	lg: projectLargeLayout,
	md: projectLargeLayout,
	sm: [
		{ i: 'images-1', x: 0, y: 0, w: 2, h: 1 },
		{ i: 'images-2', x: 0, y: 1, w: 1, h: 1 },
		{ i: 'images-3', x: 1, y: 1, w: 1, h: 2 },
		{ i: 'images-4', x: 0, y: 2, w: 1, h: 1 },
		{ i: 'images-5', x: 2, y: 3, w: 2, h: 1 },
	],
};
