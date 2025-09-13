'use client';

import { AnimatePresence, motion, useAnimation } from 'motion/react';
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
	className?: string;
	index: number;
	filter: FilterType;
};

const AnimatedGridItem = React.memo(
	({ id, children, className, index, filter }: GridItemProps) => {
		const isVisible = useMemo(() => {
			if (filter === 'all') {
				return true;
			}
			const categories = itemCategories[id] || [];
			return (
				categories.includes(filter) || categories.includes('all' as FilterType)
			);
		}, [id, filter]);

		// Calcul du délai stagger basé sur l'index - réduit pour plus de fluidité
		const staggerDelay = index * 0.03; // 30ms entre chaque élément (réduit de 50ms)

		const animateProps = useMemo(
			() => ({
				opacity: isVisible ? 1 : 0.4,
				scale: isVisible ? 1 : 0.95,
				filter: isVisible ? 'grayscale(0%)' : 'grayscale(80%)',
			}),
			[isVisible]
		);

		const transitionProps = useMemo(
			() => ({
				layout: {
					type: 'spring' as const,
					stiffness: 300, // Plus rigide pour des transitions plus rapides
					damping: 30, // Moins d'amortissement
					mass: 1, // Moins de masse
					delay: staggerDelay,
				},
				opacity: {
					duration: 0.4, // Réduit de 0.6s
					ease: 'easeInOut' as const,
					delay: 0.05 + staggerDelay,
				},
				scale: {
					duration: 0.4, // Réduit de 0.6s
					ease: 'easeInOut' as const,
					delay: 0.05 + staggerDelay,
				},
				filter: {
					duration: 0.5, // Réduit de 0.7s
					ease: 'easeInOut' as const,
					delay: 0.1 + staggerDelay,
				},
			}),
			[staggerDelay]
		);

		return (
			<motion.div
				animate={animateProps}
				className={cn(
					'aspect-square w-full overflow-hidden rounded-2xl border bg-card',
					className
				)}
				id={id}
				initial={false}
				layout="position"
				layoutId={id}
				style={{
					pointerEvents: isVisible ? 'auto' : 'none',
					userSelect: isVisible ? 'auto' : 'none',
				}}
				transition={transitionProps}
				whileHover={{
					scale: isVisible ? 1.02 : 0.95,
					transition: {
						duration: 0.2,
						ease: 'easeOut',
					},
				}}
			>
				{children}
			</motion.div>
		);
	}
);

AnimatedGridItem.displayName = 'AnimatedGridItem';

export const BentoClient = ({
	className,
	children,
}: Readonly<BentoClientProps>): React.JSX.Element => {
	const [isMounted, setMounted] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const { breakpoint } = useBreakpoint();

	useEffect(() => {
		setMounted(true);
	}, []);

	const controls = useAnimation();
	const [filter, setFilter] = useState<FilterType>('all');

	// Gérer les transitions avec un délai - optimisé
	const handleFilterChange = React.useCallback(
		(newFilter: React.SetStateAction<FilterType>) => {
			const filterValue =
				typeof newFilter === 'function' ? newFilter(filter) : newFilter;

			// Éviter les re-renders inutiles si le filtre est identique
			if (filterValue === filter) {
				return;
			}

			setIsTransitioning(true);
			setFilter(filterValue);

			// Reset transition state après l'animation (réduit à 600ms)
			setTimeout(() => {
				setIsTransitioning(false);
			}, 600);
		},
		[filter]
	);

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

	// Obtenir l'ordre des items selon le filtre
	const itemOrder = useMemo(() => {
		return filterLayouts[filter] || filterLayouts.all;
	}, [filter]);

	// Créer une map des enfants par ID - optimisé
	const childrenById = useMemo(() => {
		const childrenArray = React.Children.toArray(children);
		const map = new Map<string, React.ReactNode>();

		for (const child of childrenArray) {
			if (React.isValidElement(child)) {
				const id = (child.props as { id?: string }).id;
				if (id) {
					map.set(id, child);
				}
			}
		}

		return map;
	}, [children]);

	// Organiser les enfants selon l'ordre du filtre - optimisé
	const orderedChildren = useMemo(() => {
		const ordered: React.ReactNode[] = [];
		const remainingChildren = new Map(childrenById);

		// Réorganiser selon l'ordre du layout
		for (const id of itemOrder) {
			const child = remainingChildren.get(id);
			if (child) {
				ordered.push(child);
				remainingChildren.delete(id);
			}
		}

		// Ajouter les éléments restants
		for (const child of remainingChildren.values()) {
			ordered.push(child);
		}

		return ordered;
	}, [childrenById, itemOrder]);

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

	// Wrapper pour animer les enfants - optimisé avec useMemo
	const animatedChildren = useMemo(() => {
		return orderedChildren.map((child, index) => {
			let id = `item-${index}`;
			let childContent = child;

			if (React.isValidElement(child)) {
				const props = child.props as {
					id?: string;
					children?: React.ReactNode;
				};
				id = props.id || id;
				childContent = props.children;
			}

			return (
				<AnimatedGridItem
					className={isTransitioning ? 'transitioning' : ''}
					filter={filter}
					id={id}
					index={index}
					key={id}
				>
					{childContent}
				</AnimatedGridItem>
			);
		});
	}, [orderedChildren, filter, isTransitioning]);

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
					<motion.div
						className={cn('grid auto-rows-fr gap-4', getGridCols())}
						layout
						transition={{
							layout: {
								type: 'spring',
								stiffness: 300,
								damping: 30,
								mass: 1.2,
							},
						}}
					>
						<AnimatePresence mode="wait">{animatedChildren}</AnimatePresence>
					</motion.div>
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
