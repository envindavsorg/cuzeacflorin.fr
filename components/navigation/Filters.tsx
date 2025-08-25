'use client';

import { motion } from 'motion/react';
import type React from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const filters = ['Tout', 'Moi', 'Travail', 'Blog'];

const filterMapping: Record<string, FilterType> = {
	Tout: 'all',
	Moi: 'about',
	Travail: 'projects',
	Blog: 'blog',
};

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

	return (
		<div
			className={cn(
				'relative flex translate-x-0 transform-gpu p-2 font-bold font-mono text-sm md:font-medium md:text-sm',
				'rounded-full border-input bg-input dark:border dark:bg-transparent'
			)}
		>
			<motion.div
				animate={{ left, width, opacity: isInitialized ? 1 : 0 }}
				className="-z-10 absolute h-8 rounded-2xl border border-input bg-white"
				initial={{ left, width, opacity: 0 }}
				style={{ left, width }}
				transition={{
					duration: isInitialized ? 0.4 : 0,
					opacity: { duration: 0.3, ease: 'easeOut' },
					ease: [0.85, 0, 0.3, 1],
				}}
			/>
			{filters.map((filter, index) => (
				<div
					className={cn(
						'flex h-8 items-center rounded-[50px] px-4 transition-colors duration-300 ease-in-out hover:cursor-pointer',
						selectedFilter === filter ? 'text-black' : 'dark:text-white'
					)}
					key={filter}
					onClick={(event) => {
						return ((event, filter: string) => {
							setLeft(event.currentTarget.offsetLeft);
							setWidth(event.currentTarget.offsetWidth);
							setSelectedFilter(filter);
							setFilterAction(filterMapping[filter]);
						})(event, filter);
					}}
					ref={index === 0 ? firstFilterRef : null}
				>
					{filter}
				</div>
			))}
		</div>
	);
};
