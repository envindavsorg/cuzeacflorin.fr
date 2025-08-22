'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export const filters = ['Tout', 'Moi', 'Travail', 'Blog'];

const filterMapping: Record<string, 'all' | 'about' | 'projects' | 'blog'> = {
	'Tout': 'all',
	'Moi': 'about', 
	'Travail': 'projects',
	'Blog': 'blog'
};

export const Filter = ({
	setFilter,
}: {
	setFilter: (filter: 'all' | 'about' | 'projects' | 'blog') => void;
}) => {
	const [left, setLeft] = useState(5);
	const [width, setWidth] = useState(49);

	return (
		<div className="relative flex translate-x-0 transform-gpu rounded-[23px] border border-[var(--filterBorder)] bg-[var(--filterBackground)] bg-transparent p-[5px] text-sm">
			<motion.div
				animate={{
					left,
					width,
				}}
				className="-z-10 absolute h-8 w-[49px] rounded-2xl border border-[var(--filterBorder)] bg-[var(--highlightBackground)]"
				transition={{
					duration: 0.4,
					ease: [0.85, 0, 0.3, 1],
				}}
			/>
			{filters.map((filter) => (
				<div
					className="flex h-8 items-center rounded-[50px] px-4 text-[var(--filterText)] transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-50 hover:transition-opacity hover:duration-[250ms] hover:ease-in-out"
					key={filter}
					onClick={(event) => {
						return ((event, filter: string) => {
							setLeft(event.currentTarget.offsetLeft);
							setWidth(event.currentTarget.offsetWidth);
							setFilter(filterMapping[filter]);
						})(event, filter);
					}}
				>
					{filter}
				</div>
			))}
		</div>
	);
};
