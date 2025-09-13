'use client';

import { useAnimation } from 'motion/react';
import type React from 'react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import RGL, { type Layout, WidthProvider } from 'react-grid-layout';
import { itemCategories } from '@/components/blocs/categories';
import { NavBar } from '@/components/navigation/NavBar';
import useBreakpoint from '@/hooks/useBreakpoint';
import { breakpoints as bpMap, cols as colsMap, heights } from '@/lib/consts';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName } = PROFILE_CONFIG;

type GridAnyProps = { children?: React.ReactNode } & Record<string, unknown>;
const BaseGrid = RGL as unknown as React.ComponentType<GridAnyProps>;
const GridLayoutWithWidth = WidthProvider(
	BaseGrid
) as unknown as React.ComponentType<GridAnyProps>;

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
	const { breakpoint } = useBreakpoint();

	// Hauteur de ligne selon breakpoint (fallback 280)
	const [height, setHeight] = useState(() => {
		if (typeof window === 'undefined') {
			return 230;
		}
		const currentBreakpoint = breakpoint || 'lg';
		return heights[currentBreakpoint] || 230;
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
					!(
						categories.includes('all' as FilterType) ||
						categories.includes(filter)
					)
			)
			.map(([itemId]) => `#${itemId}`)
			.join(', ');

		return hiddenItems
			? `
			${hiddenItems} {
				pointer-events: none;
				user-select: none;
				opacity: 0.4 !important;
				filter: grayscale(80%) !important;
				transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
			}
		`
			: '';
	}, [filter]);

	// Sélectionne layout/cols selon breakpoint fenêtre (logique Tailwind min-width)
	const currentBreakpoint = breakpoint || 'lg';
	const currentCols = colsMap[currentBreakpoint] ?? 4; // xl:5, lg:4, md:3, sm:2

	const available = layouts?.[filter] ?? {};
	const bpValue = (key: string) => bpMap[key as keyof typeof bpMap] ?? 0;
	const currentBpVal = bpValue(currentBreakpoint);
	let selectedKey: string | undefined;

	// 1) Essayer exactement le breakpoint courant
	if (available[currentBreakpoint]) {
		selectedKey = currentBreakpoint;
	} else {
		// 2) Chercher le plus proche inférieur
		const candidates = Object.keys(available)
			.filter((k) => bpValue(k) <= currentBpVal)
			.sort((a, b) => bpValue(b) - bpValue(a));
		selectedKey = candidates[0];

		// 3) Si aucun inférieur, prendre le plus petit disponible
		if (!selectedKey) {
			const allKeys = Object.keys(available).sort(
				(a, b) => bpValue(a) - bpValue(b)
			);
			selectedKey = allKeys[0];
		}
	}
	const currentLayout: Layout[] = (selectedKey && available[selectedKey]) || [];

	return (
		<div className={className}>
			<NavBar
				className={className}
				firstName={firstName}
				lastName={lastName}
				setFilter={
					setFilter as React.Dispatch<React.SetStateAction<FilterType>>
				}
			/>

			<section
				className={cn(
					'relative mx-auto w-full',
					isMounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
					'transition-[opacity,_transform] duration-300'
				)}
				suppressHydrationWarning
			>
				{isMounted && (
					<GridLayoutWithWidth
						cols={currentCols}
						draggableCancel=".cancel-drag"
						isBounded
						isDraggable={false}
						isResizable={false}
						layout={currentLayout}
						margin={[16, 16]}
						measureBeforeMount
						rowHeight={height}
						useCSSTransforms
					>
						{children}
					</GridLayoutWithWidth>
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
		</div>
	);
};
