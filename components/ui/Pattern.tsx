'use client';

import { motion } from 'motion/react';
import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PatternProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	cx?: number;
	cy?: number;
	cr?: number;
	className?: string;
	glow?: boolean;
	[key: string]: unknown;
}

export const Pattern = ({
	width = 16,
	height = 16,
	x = 0,
	y = 0,
	cx = 1,
	cy = 1,
	cr = 1,
	className,
	glow = false,
	...props
}: PatternProps): React.JSX.Element => {
	const id = useId();
	const containerRef = useRef<SVGSVGElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				const { width, height } = containerRef.current.getBoundingClientRect();
				setDimensions({ width, height });
			}
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	const dots = Array.from(
		{
			length:
				Math.ceil(dimensions.width / width) *
				Math.ceil(dimensions.height / height),
		},
		(_, i) => {
			const col = i % Math.ceil(dimensions.width / width);
			const row = Math.floor(i / Math.ceil(dimensions.width / width));
			return {
				x: col * width + cx,
				y: row * height + cy,
				delay: Math.random() * 5,
				duration: Math.random() * 3 + 2,
			};
		}
	);

	return (
		<svg
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute inset-0 z-0 h-full w-full opacity-25',
				className
			)}
			ref={containerRef}
			{...props}
		>
			<defs>
				<radialGradient id={`${id}-gradient`}>
					<stop offset="0%" stopColor="currentColor" stopOpacity="1" />
					<stop offset="100%" stopColor="currentColor" stopOpacity="0" />
				</radialGradient>
			</defs>
			{dots.map((dot, index) => (
				<motion.circle
					animate={
						glow
							? {
									opacity: [0.4, 1, 0.4],
									scale: [1, 1.5, 1],
								}
							: {}
					}
					className="text-neutral-400/80 dark:text-neutral-600"
					cx={dot.x}
					cy={dot.y}
					fill={glow ? `url(#${id}-gradient)` : 'currentColor'}
					initial={glow ? { opacity: 0.4, scale: 1 } : {}}
					key={`${dot.x}-${dot.y}-${index + 1}`}
					r={cr}
					transition={
						glow
							? {
									duration: dot.duration,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: 'reverse',
									delay: dot.delay,
									ease: 'easeInOut',
								}
							: {}
					}
				/>
			))}
		</svg>
	);
};
