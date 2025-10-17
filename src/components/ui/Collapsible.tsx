'use client';

import { motion, useAnimation } from 'motion/react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import type React from 'react';
import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

type ChevronsDownUpIconHandle = {
	startAnimation: () => void;
	stopAnimation: () => void;
};

type ChevronsDownUpIconProps = React.ComponentProps<'svg'>;

const ChevronsDownUpIcon = forwardRef<
	ChevronsDownUpIconHandle,
	ChevronsDownUpIconProps
>((props, ref): React.JSX.Element => {
	const controls = useAnimation();

	useImperativeHandle(ref, () => ({
		startAnimation: () => controls.start('animate'),
		stopAnimation: () => controls.start('normal'),
	}));

	return (
		<svg
			fill="none"
			height="24"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Chevrons down and up icon</title>
			<motion.path
				animate={controls}
				d="M7 15L12 20L17 15"
				initial="normal"
				transition={{
					duration: 0.3,
				}}
				variants={{
					normal: {
						d: 'M7 15L12 20L17 15',
					},
					animate: {
						d: 'M7 20L12 15L17 20',
					},
				}}
			/>
			<motion.path
				animate={controls}
				d="M7 9L12 4L17 9"
				initial="normal"
				transition={{
					duration: 0.3,
				}}
				variants={{
					normal: {
						d: 'M7 9L12 4L17 9',
					},
					animate: {
						d: 'M7 4L12 9L17 4',
					},
				}}
			/>
		</svg>
	);
});

ChevronsDownUpIcon.displayName = 'ChevronsDownUpIcon';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
>(
	({ children, className, ...props }, ref): React.JSX.Element => (
		<CollapsiblePrimitive.CollapsibleContent
			asChild
			className={className}
			ref={ref}
			{...props}
		>
			<motion.div
				animate="open"
				exit="collapsed"
				initial="collapsed"
				transition={{
					duration: 0.3,
					ease: [0.4, 0, 0.2, 1],
				}}
				variants={{
					open: {
						opacity: 1,
						height: 'auto',
					},
					collapsed: {
						opacity: 0,
						height: 0,
					},
				}}
			>
				{children}
			</motion.div>
		</CollapsiblePrimitive.CollapsibleContent>
	)
);

CollapsibleContent.displayName = 'CollapsibleContent';

type CollapsibleContextType = {
	open: boolean;
};

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

const useCollapsible = () => {
	const context = useContext(CollapsibleContext);

	if (!context) {
		throw new Error(
			'Collapsible components must be used within a CollapsibleWithContext'
		);
	}

	return context;
};

const CollapsibleWithContext = ({
	defaultOpen,
	...props
}: React.ComponentProps<typeof Collapsible>): React.JSX.Element => {
	const [open, setOpen] = useState(defaultOpen ?? false);

	return (
		<CollapsibleContext.Provider value={{ open }}>
			<Collapsible onOpenChange={setOpen} open={open} {...props} />
		</CollapsibleContext.Provider>
	);
};

const CollapsibleChevronsIcon = (): React.JSX.Element => {
	const { open } = useCollapsible();

	const ref = useRef<ChevronsDownUpIconHandle>(null);

	useEffect(() => {
		const controls = ref.current;
		if (!controls) {
			return;
		}

		if (open) {
			controls.startAnimation();
		} else {
			controls.stopAnimation();
		}
	}, [open]);

	return <ChevronsDownUpIcon ref={ref} />;
};

export {
	Collapsible,
	CollapsibleChevronsIcon,
	CollapsibleContent,
	CollapsibleTrigger,
	CollapsibleWithContext,
};
