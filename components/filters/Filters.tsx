'use client';

import { motion } from 'motion/react';
import type React from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { filterMapping, filters } from '@/components/filters/content';
import { cn } from '@/lib/utils';

type FiltersProps = {
	setFilterAction: (filter: FilterType) => void;
};

export const Filter = ({
	setFilterAction,
}: FiltersProps): React.JSX.Element => {
	const [left, setLeft] = useState(5);
	const [width, setWidth] = useState(49);
	const [isInitialized, setIsInitialized] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState('Tout');
	const firstFilterRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (firstFilterRef.current) {
			setLeft(firstFilterRef.current.offsetLeft);
			setWidth(firstFilterRef.current.offsetWidth);
			setIsInitialized(true);
		}
	}, []);

	const handleClick = useCallback(
		(
			event: React.MouseEvent<HTMLDivElement, MouseEvent>,
			filter: string
		): void => {
			if (selectedFilter === filter) {
				return;
			}

			const target = event.currentTarget;
			const newLeft = target.offsetLeft;
			const newWidth = target.offsetWidth;

			setSelectedFilter(filter);
			setFilterAction(filterMapping[filter]);

			requestAnimationFrame(() => {
				setLeft(newLeft);
				setWidth(newWidth);
			});
		},
		[selectedFilter, setFilterAction]
	);

	return (
		<div
			className={cn(
				'relative flex translate-x-0 transform-gpu p-2',
				'rounded-full border-input bg-input dark:border dark:bg-transparent',
				'font-medium font-pixelify-sans text-base'
			)}
		>
			<motion.div
				animate={{ left, width, opacity: isInitialized ? 1 : 0 }}
				className="-z-10 absolute h-8 rounded-2xl border border-input bg-white"
				initial={{ left, width, opacity: 0 }}
				style={{ left, width }}
				transition={{ duration: isInitialized ? 0.25 : 0, ease: 'easeOut' }}
			/>

			{filters.map((filter: string, idx: number) => (
				<div
					className={cn(
						'flex h-8 items-center rounded-[50px] px-4 hover:cursor-pointer',
						'transition-colors duration-300 ease-in-out',
						selectedFilter === filter ? 'text-black' : 'dark:text-white'
					)}
					key={filter}
					onClick={(event) => handleClick(event, filter)}
					ref={idx === 0 ? firstFilterRef : null}
				>
					{filter}
				</div>
			))}
		</div>
	);
};
