'use client';

import { type MotionStyle, motion, type Transition } from 'motion/react';
import type React from 'react';
import { cn } from '@/lib/utils';

type BeamProps = {
	size?: number;
	duration?: number;
	delay?: number;
	colorFrom?: string;
	colorTo?: string;
	transition?: Transition;
	className?: string;
	style?: React.CSSProperties;
	reverse?: boolean;
	initialOffset?: number;
	borderWidth?: number;
};

export const Beam = ({
	className,
	size = 50,
	delay = 0,
	duration = 6,
	colorFrom = '#e4620c',
	colorTo = '#fce24a',
	transition,
	style,
	reverse = false,
	initialOffset = 0,
	borderWidth = 1,
}: BeamProps) => {
	return (
		<div
			className="border-(length:--border-beam-width) pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
			style={
				{
					'--border-beam-width': `${borderWidth}px`,
				} as React.CSSProperties
			}
		>
			<motion.div
				animate={{
					offsetDistance: reverse
						? [`${100 - initialOffset}%`, `${-initialOffset}%`]
						: [`${initialOffset}%`, `${100 + initialOffset}%`],
				}}
				className={cn(
					'absolute aspect-square',
					'bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent',
					className
				)}
				initial={{ offsetDistance: `${initialOffset}%` }}
				style={
					{
						width: size,
						offsetPath: `rect(0 auto auto 0 round ${size}px)`,
						'--color-from': colorFrom,
						'--color-to': colorTo,
						...style,
					} as MotionStyle
				}
				transition={{
					repeat: Number.POSITIVE_INFINITY,
					ease: 'linear',
					duration,
					delay: -delay,
					...transition,
				}}
			/>
		</div>
	);
};
