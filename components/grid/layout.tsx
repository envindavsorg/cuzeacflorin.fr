'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import {
	Responsive,
	type ResponsiveProps,
	WidthProvider,
} from 'react-grid-layout';
import useBreakpoint from '@/hooks/useBreakpoint';
import { cn } from '@/lib/utils';
import { breakpoints, cols, heights } from '@/utils/consts';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface LayoutProps {
	filter?: FilterType;
}

export default function GridLayout({
	layouts,
	className,
	children,
	filter,
}: Readonly<ResponsiveProps & LayoutProps>) {
	const [isMounted, setMounted] = useState(false);
	const [isDraggable, setDraggable] = useState(true);
	const { breakpoint, setBreakpoint } = useBreakpoint();

	const [height, setHeight] = useState(() => {
		if (typeof window === 'undefined') return 280;
		const currentBreakpoint = breakpoint || 'lg';
		return heights[currentBreakpoint] || 280;
	});

	useIsomorphicLayoutEffect(() => {
		if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
			setDraggable(false);
		}

		setMounted(true);
	}, []);

	useEffect(() => {
		if (breakpoint && heights[breakpoint]) {
			setHeight(heights[breakpoint]);
		}
	}, [breakpoint]);

	const opacityValue = (section: string) =>
		filter === 'all' || section === filter ? 1 : 0.25;

	return (
		<section
			className={cn(
				'relative mx-auto w-full pb-20',
				'max-w-[320px]',
				'sm:max-w-[375px]',
				'md:max-w-[800px]',
				'lg:max-w-[1200px]',
				isMounted
					? 'translate-y-0 opacity-100'
					: '-translate-y-6 opacity-0',
				'transition-[opacity,_transform] duration-300',
				className,
			)}
			suppressHydrationWarning
		>
			{isMounted && (
				<ResponsiveGridLayout
					useCSSTransforms
					layouts={layouts}
					breakpoints={breakpoints}
					cols={cols}
					isBounded
					isDraggable={isDraggable}
					isResizable={false}
					rowHeight={height}
					measureBeforeMount
					draggableCancel=".cancel-drag"
					onBreakpointChange={(newBreakpoint: string) => {
						setBreakpoint(newBreakpoint);
						if (heights[newBreakpoint]) {
							setHeight(heights[newBreakpoint]);
						}
					}}
					margin={[16, 16]}
				>
					{children}
				</ResponsiveGridLayout>
			)}

			{!isMounted && (
				<div
					className="grid gap-4 opacity-50"
					style={{
						gridTemplateColumns:
							'repeat(auto-fit, minmax(280px, 1fr))',
						minHeight: height,
					}}
				>
					{children}
				</div>
			)}
		</section>
	);
}
