'use client';

import { motion, useAnimation } from 'motion/react';
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { type Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { Filter } from '@/components/navigation/Filters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import useBreakpoint from '@/hooks/useBreakpoint';
import { breakpoints, cols, heights } from '@/lib/consts';
import { cn } from '@/lib/utils';

const itemCategories: Record<
	string,
	('about' | 'projects' | 'blog' | 'misc' | 'all')[]
> = {
	bio: ['about'],
	location: ['about'],
	cv: ['projects'],
	commit: ['about', 'projects'],
	article: ['blog'],
	switcher: ['misc'],
	linkedin: ['projects'],
	contact: ['about'],
	portfolio: ['blog'],
	work: ['projects', 'blog'],
	clock: ['misc'],
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type FilterType = 'all' | 'about' | 'projects' | 'blog' | 'misc';

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
	const [isDraggable, setDraggable] = useState(true);
	const { breakpoint, setBreakpoint } = useBreakpoint();

	const [height, setHeight] = useState(() => {
		if (typeof window === 'undefined') {
			return 280;
		}
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

	const filterCSS = React.useMemo(() => {
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
			{filterCSS && <style>{filterCSS}</style>}
			<motion.nav
				animate={{ opacity: 1 }}
				className="flex h-[136px] w-full items-center justify-between px-[3.5vw] max-sm:h-[180px] max-sm:flex-col max-sm:justify-center"
				initial={{ opacity: 1 }}
			>
				<Avatar className="size-12">
					<AvatarImage src="/avatar.webp" />
					<AvatarFallback>CF</AvatarFallback>
				</Avatar>
				<Filter setFilter={setFilter} />
				<Link
					className="font-normal text-[var(--text)] text-sm leading-6 tracking-[0.25px] transition-all duration-200 ease-in-out hover:cursor-pointer hover:opacity-60 max-sm:hidden"
					href="mailto:houssaineamzil18@gmail.com"
					style={{ lineHeight: 'normal' }}
				>
					Contact
				</Link>
			</motion.nav>

			<section
				className={cn(
					'relative mx-auto w-full',
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
						isDraggable={isDraggable}
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
		</>
	);
};
