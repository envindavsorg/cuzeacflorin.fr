'use client';

import { XIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

type DrawerContextType = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = () => {
	const context = useContext(DrawerContext);
	if (!context) {
		throw new Error('Drawer components must be used within a Drawer');
	}
	return context;
};

type DrawerProps = {
	children: React.ReactNode;
};

export const Drawer = ({ children }: DrawerProps): React.JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<DrawerContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};

type DrawerTriggerProps = {
	children: React.ReactNode;
	className?: string;
};

export const DrawerTrigger = ({
	children,
	className,
}: DrawerTriggerProps): React.JSX.Element => {
	const { setIsOpen } = useDrawer();

	return (
		<button
			className={cn(className)}
			onClick={() => setIsOpen(true)}
			type="button"
		>
			{children}
		</button>
	);
};

type DrawerContentProps = {
	children: React.ReactNode;
	className?: string;
};

export const DrawerContent = ({
	children,
	className,
}: DrawerContentProps): React.JSX.Element => {
	const { isOpen, setIsOpen } = useDrawer();

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<>
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-50 bg-black/50"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={() => setIsOpen(false)}
						transition={{ duration: 0.2, ease: 'easeOut' }}
					/>

					<motion.div
						animate={{
							y: 0,
							opacity: 1,
						}}
						className={cn(
							'fixed right-0 bottom-0 left-0 z-50 mx-auto flex max-h-[70vh] w-[100%] flex-col overflow-hidden border-input border-t bg-background',
							className
						)}
						exit={{
							y: '100%',
							opacity: 0,
						}}
						initial={{
							y: '100%',
							opacity: 0,
						}}
						transition={{
							duration: 0.25,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

type DrawerHeaderProps = {
	children: React.ReactNode;
	className?: string;
	showCloseButton?: boolean;
};

export const DrawerHeader = ({
	children,
	className,
	showCloseButton = true,
}: DrawerHeaderProps): React.JSX.Element => {
	const { setIsOpen } = useDrawer();

	return (
		<div
			className={cn(
				'flex items-center justify-between border-border border-b p-4',
				className
			)}
		>
			<div className="flex-1">{children}</div>
			{showCloseButton && (
				<motion.button
					className="ml-4 text-muted-foreground transition-colors hover:text-foreground"
					onClick={() => setIsOpen(false)}
					type="button"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<XIcon size={20} />
				</motion.button>
			)}
		</div>
	);
};

type DrawerBodyProps = {
	children: React.ReactNode;
	className?: string;
};

export const DrawerBody = ({
	children,
	className,
}: DrawerBodyProps): React.JSX.Element => (
	<div className={cn('flex-1 overflow-y-auto p-4', className)}>{children}</div>
);

type DrawerFooterProps = {
	children: React.ReactNode;
	className?: string;
};

export const DrawerFooter = ({
	children,
	className,
}: DrawerFooterProps): React.JSX.Element => (
	<div className={cn('border-border border-t', className)}>{children}</div>
);
