'use client';

import { Slot } from '@radix-ui/react-slot';
import {
	type ForwardRefComponent,
	type HTMLMotionProps,
	type MotionProps,
	motion,
} from 'motion/react';
import type React from 'react';
import { defaultVariants } from '@/components/motion/motion.variants';

type BaseMotionProps = {
	children: React.ReactNode;
	className?: string;
	asChild?: boolean;
} & MotionProps;

export function Motion({
	children,
	className,
	asChild,
	initial,
	animate,
	exit,
	variants,
	...props
}: BaseMotionProps) {
	const Comp = asChild
		? (motion(Slot) as ForwardRefComponent<
				HTMLDivElement,
				HTMLMotionProps<'div'>
			>)
		: motion.div;

	const defaultProps: Partial<BaseMotionProps> = {
		initial: initial || 'hidden',
		animate: animate || 'visible',
		exit: exit || 'hidden',
		variants: variants || defaultVariants,
	};
	return (
		<Comp {...defaultProps} className={className} {...props}>
			{children}
		</Comp>
	);
}
