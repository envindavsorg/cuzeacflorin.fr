import type React from 'react';
import type { Layout } from 'react-grid-layout';
import { Article } from '@/components/widgets/Article';
import { BioWidget } from '@/components/widgets/bio/BioWidget';
import { Contact } from '@/components/widgets/Contact';
import { CommitWidget } from '@/components/widgets/commit/CommitWidget';
import { GitHub } from '@/components/widgets/GitHub';
import { LinkedIn } from '@/components/widgets/LinkedIn';
import { LocationWidget } from '@/components/widgets/location/LocationWidget';
import { Portfolio } from '@/components/widgets/Portfolio';
import { Project } from '@/components/widgets/Project';
import { ThemeWidget } from '@/components/widgets/theme/ThemeWidget';

type GridItem = {
	i: string;
	component: React.ComponentType;
};

export const gridItems: GridItem[] = [
	{ i: 'bio', component: BioWidget },
	{ i: 'location', component: LocationWidget },
	{ i: 'project', component: Project },
	{ i: 'commit', component: CommitWidget },
	{ i: 'article', component: Article },
	{ i: 'theme', component: ThemeWidget },
	{ i: 'linkedin', component: LinkedIn },
	{ i: 'contact', component: Contact },
	{ i: 'portfolio', component: Portfolio },
	{ i: 'github', component: GitHub },
];

type Layouts = 'lg' | 'md' | 'sm';

export const layouts: { [key in Layouts]: Layout[] } = {
	lg: [
		{ i: 'bio', x: 0, y: 0, w: 2, h: 1, isResizable: false },
		{ i: 'location', x: 2, y: 0, w: 1, h: 1, isResizable: false },
		{ i: 'project', x: 3, y: 0, w: 1, h: 2, isResizable: false },
		{ i: 'commit', x: 0, y: 1, w: 1, h: 1, isResizable: false },
		{ i: 'article', x: 0, y: 2, w: 2, h: 1, isResizable: false },
		{ i: 'theme', x: 1, y: 0, w: 1, h: 1, isResizable: false },
		{ i: 'linkedin', x: 3, y: 2, w: 1, h: 1, isResizable: false },
		{ i: 'contact', x: 2, y: 2, w: 2, h: 1, isResizable: false },
		{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
		{ i: 'github', x: 0, y: 3, w: 2, h: 1, isResizable: false },
	],
	md: [
		{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
		{ i: 'location', x: 2, y: 0, w: 1, h: 1, isResizable: false },
		{ i: 'project', x: 3, y: 0, w: 1, h: 2, isResizable: false },
		{ i: 'commit', x: 0, y: 2, w: 2, h: 1, isResizable: false },
		{ i: 'linkedin', x: 3, y: 2, w: 1, h: 1, isResizable: false },
		{ i: 'theme', x: 1, y: 5, w: 1, h: 1, isResizable: false },
		{ i: 'article', x: 0, y: 3, w: 2, h: 2, isResizable: false },
		{ i: 'contact', x: 2, y: 3, w: 2, h: 2, isResizable: false },
		{ i: 'portfolio', x: 2, y: 1, w: 1, h: 2, isResizable: false },
		{ i: 'github', x: 2, y: 3, w: 2, h: 1, isResizable: false },
	],
	sm: [
		{ i: 'bio', x: 0, y: 0, w: 2, h: 2, isResizable: false },
		{ i: 'location', x: 0, y: 2, w: 2, h: 1, isResizable: false },
		{ i: 'project', x: 1, y: 3, w: 1, h: 2, isResizable: false },
		{ i: 'commit', x: 0, y: 6, w: 2, h: 2, isResizable: false },
		{ i: 'linkedin', x: 1, y: 5, w: 1, h: 1, isResizable: false },
		{ i: 'theme', x: 0, y: 3, w: 1, h: 1, isResizable: false },
		{ i: 'article', x: 0, y: 8, w: 2, h: 2, isResizable: false },
		{ i: 'contact', x: 0, y: 9, w: 2, h: 2, isResizable: false },
		{ i: 'portfolio', x: 0, y: 4, w: 1, h: 2, isResizable: false },
		{ i: 'github', x: 0, y: 10, w: 2, h: 2, isResizable: false },
	],
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
