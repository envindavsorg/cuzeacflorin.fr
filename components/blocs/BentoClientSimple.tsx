'use client';

import { useAnimation } from 'motion/react';
import React, { useEffect, useMemo, useState } from 'react';
import { itemCategories } from '@/components/blocs/categories';
import { NavBar } from '@/components/navigation/NavBar';
import useBreakpoint from '@/hooks/useBreakpoint';
import { cols as colsMap } from '@/lib/consts';
import { filterLayouts } from '@/lib/filterLayouts';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName } = PROFILE_CONFIG;

type BentoClientProps = {
	className?: string;
	children: React.ReactNode;
};

type GridItemProps = {
	id: string;
	children: React.ReactNode;
	filter: FilterType;
};

const AnimatedGridItem = React.memo(
	({ id, children, filter }: GridItemProps) => {
		const isVisible = useMemo(() => {
			if (filter === 'all') {
				return true;
			}
			const categories = itemCategories[id] || [];
			return (
				categories.includes(filter) || categories.includes('all' as FilterType)
			);
		}, [id, filter]);

		return (
			<div
				className={cn(
					'aspect-square w-full overflow-hidden rounded-2xl border bg-card transition-opacity duration-300',
					isVisible ? 'opacity-100' : 'opacity-40'
				)}
				style={{
					pointerEvents: isVisible ? 'auto' : 'none',
					userSelect: isVisible ? 'auto' : 'none',
				}}
			>
				{children}
			</div>
		);
	}
);

AnimatedGridItem.displayName = 'AnimatedGridItem';

export const BentoClientSimple = ({
	className,
	children,
}: Readonly<BentoClientProps>): React.JSX.Element => {
	const [isMounted, setMounted] = useState(false);
	const { breakpoint } = useBreakpoint();
	const [filter, setFilter] = useState<FilterType>('all');

	// Simple filter change handler
	const handleFilterChange = React.useCallback((newFilter: FilterType) => {
		setFilter(newFilter);
	}, []);

	useEffect(() => {
		setMounted(true);
	}, []);

	const controls = useAnimation();

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

	// Grid columns based on breakpoint
	const currentBreakpoint = breakpoint || 'lg';
	const currentCols = colsMap[currentBreakpoint] ?? 4;

	// Get grid template columns for Tailwind
	const getGridCols = () => {
		switch (currentCols) {
			case 1:
				return 'grid-cols-1';
			case 2:
				return 'grid-cols-2';
			case 3:
				return 'grid-cols-3';
			case 4:
				return 'grid-cols-4';
			case 5:
				return 'grid-cols-5';
			default:
				return 'grid-cols-4';
		}
	};

	// Get item order based on filter
	const itemOrder = filterLayouts[filter] || filterLayouts.all;

	// Créer une map des enfants
	const childrenMap = useMemo(() => {
		const map = new Map<string, React.ReactNode>();
		React.Children.forEach(children, (child) => {
			if (React.isValidElement(child)) {
				const props = child.props as { id?: string };
				if (props.id) {
					map.set(props.id, child);
				}
			}
		});
		return map;
	}, [children]);

	// Memoized children rendering to prevent freeze
	const renderedChildren = useMemo(() => {
		return itemOrder.map((itemId) => {
			const child = childrenMap.get(itemId);
			if (child && React.isValidElement(child)) {
				const props = child.props as { children?: React.ReactNode };
				return (
					<AnimatedGridItem filter={filter} id={itemId} key={itemId}>
						{props.children}
					</AnimatedGridItem>
				);
			}
			return null;
		});
	}, [itemOrder, childrenMap, filter]);

	return (
		<div className={className}>
			<NavBar
				className={className}
				firstName={firstName}
				lastName={lastName}
				setFilter={handleFilterChange}
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
					<div className={cn('grid auto-rows-fr gap-4', getGridCols())}>
						{renderedChildren}
					</div>
				)}

				{!isMounted && (
					<div className="grid auto-rows-fr grid-cols-1 gap-4 opacity-50 sm:grid-cols-2 lg:grid-cols-4">
						{children}
					</div>
				)}
			</section>
		</div>
	);
};
