'use client';

import { useAnimation } from 'motion/react';
import type React from 'react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { type Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { NavBar } from '@/components/navigation/NavBar';
import useBreakpoint from '@/hooks/useBreakpoint';
import { breakpoints, cols, heights } from '@/lib/consts';
import { cn } from '@/lib/utils';

const itemCategories: Record<string, FilterType[]> = {
	bio: ['about'],
	location: ['about'],
	cv: ['projects'],
	commit: ['about', 'projects'],
	article: ['blog'],
	switcher: ['about'],
	linkedin: ['projects'],
	contact: ['about'],
	portfolio: ['blog'],
	work: ['projects', 'blog'],
	clock: ['about'],
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

type BentoProps = {
	layouts?: Record<string, Record<string, Layout[]>>;
	className?: string;
	children: React.ReactNode;
};

export const Bento = ({
	layouts,
	className,
	children,
}: Readonly<BentoProps>): React.JSX.Element => {
	const [isMounted, setMounted] = useState(false);
	const { breakpoint, setBreakpoint } = useBreakpoint();

	const [height, setHeight] = useState(() => {
		if (typeof window === 'undefined') {
			return 280;
		}
		const currentBreakpoint = breakpoint || 'lg';
		return heights[currentBreakpoint] || 280;
	});

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (breakpoint && heights[breakpoint]) {
			setHeight(heights[breakpoint]);
		}
	}, [breakpoint]);

	const controls = useAnimation();
	const [filter, setFilter] = useState<FilterType>('all');

	useEffect(() => {
		controls.set({
			y: 15,
			opacity: 0,
		});

		controls.start({
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
			},
		});
	}, [controls]);

	const filterCSS = useMemo(() => {
		if (filter === 'all') {
			return '';
		}

		const hiddenItems = Object.entries(itemCategories)
			.filter(
				([_, categories]) =>
					!(categories.includes('all') || categories.includes(filter))
			)
			.map(([itemId]) => `#${itemId}`)
			.join(', ');

		return hiddenItems
			? `
			${hiddenItems} {
				opacity: 0.4 !important;
				filter: grayscale(80%) !important;
				transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
			}
		`
			: '';
	}, [filter]);

	return (
		<>
			<NavBar setFilter={setFilter} />

			<section
				className={cn(
					'relative mx-auto w-full max-md:mt-4',
					'max-w-[320px]',
					'sm:max-w-[375px]',
					'md:max-w-[800px]',
					'lg:max-w-[1200px]',
					isMounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
					'transition-[opacity,_transform] duration-300',
					className
				)}
				suppressHydrationWarning
			>
				{isMounted && (
					<ResponsiveGridLayout
						breakpoints={breakpoints}
						cols={cols}
						draggableCancel=".cancel-drag"
						isBounded
						isDraggable={false}
						isResizable={false}
						layouts={layouts?.[filter] || {}}
						margin={[16, 16]}
						measureBeforeMount
						onBreakpointChange={(newBreakpoint: string) => {
							setBreakpoint(newBreakpoint);
							if (heights[newBreakpoint]) {
								setHeight(heights[newBreakpoint]);
							}
						}}
						rowHeight={height}
						useCSSTransforms
					>
						{children}
					</ResponsiveGridLayout>
				)}

				{!isMounted && (
					<div
						className="grid gap-4 opacity-50"
						style={{
							gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
							minHeight: height,
						}}
					>
						{children}
					</div>
				)}
			</section>

			{filterCSS && <style>{filterCSS}</style>}
		</>
	);
};
