'use client';

import { motion, useReducedMotion } from 'motion/react';
import type React from 'react';
import { createContext, forwardRef, useContext } from 'react';

const FadeStaggerContext = createContext(false);

const viewport = {
	once: true,
	margin: '0px 0px -200px',
};

type FadeProps = {
	asChild?: boolean;
	className?: string;
	children: React.ReactNode;
};

export const Fade = forwardRef<
	React.ComponentRef<typeof motion.div>,
	FadeProps
>(({ asChild, className, children, ..._props }, ref): React.JSX.Element => {
	const reduceMotion = useReducedMotion();
	const isStaggered = useContext(FadeStaggerContext);

	const variants = {
		hidden: {
			opacity: 0,
			y: reduceMotion ? 0 : 24,
		},
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	const viewProps = isStaggered
		? {}
		: {
				initial: 'hidden',
				whileInView: 'visible',
				viewport,
			};

	return (
		<motion.div
			className={className}
			ref={ref}
			transition={{
				duration: 0.3,
			}}
			variants={variants}
			{...viewProps}
			{..._props}
		>
			{children}
		</motion.div>
	);
});

Fade.displayName = 'Fade';

type FadeStaggerProps = {
	children: React.ReactNode;
	faster?: boolean;
	className?: string;
};

export const FadeStagger = forwardRef<
	React.ComponentRef<typeof motion.div>,
	FadeStaggerProps
>(
	(
		{ faster = false, children, className, ...props },
		ref
	): React.JSX.Element => (
		<FadeStaggerContext.Provider value={true}>
			<motion.div
				className={className}
				initial="hidden"
				ref={ref}
				transition={{ staggerChildren: faster ? 0.1 : 0.2 }}
				viewport={viewport}
				whileInView="visible"
				{...props}
			>
				{children}
			</motion.div>
		</FadeStaggerContext.Provider>
	)
);

FadeStagger.displayName = 'FadeStagger';
