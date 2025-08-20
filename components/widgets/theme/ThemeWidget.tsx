'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { cn } from '@/lib/utils';

export const ThemeWidget = memo((): React.JSX.Element => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
	const isUserInitiatedRef = useRef<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		setIsMounted(true);
		setIsDarkMode(theme === 'dark');
	}, [theme]);

	useEffect(() => {
		if (isMounted && !isUserInitiatedRef.current) {
			setIsDarkMode(theme === 'dark');
		}
		isUserInitiatedRef.current = false;
	}, [theme, isMounted]);

	const changeTheme = () => {
		if (!(buttonRef.current && isMounted)) {
			return;
		}

		setHasUserInteracted(true);
		isUserInitiatedRef.current = true;
		const newTheme = theme === 'dark' ? 'light' : 'dark';

		if (document.startViewTransition && buttonRef.current) {
			const { top, left, width, height } =
				buttonRef.current.getBoundingClientRect();
			const y = top + height / 2;
			const x = left + width / 2;
			const right = window.innerWidth - left;
			const bottom = window.innerHeight - top;
			const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

			const transition = document.startViewTransition(() => {
				flushSync(() => {
					setTheme(newTheme);
					setIsDarkMode(newTheme === 'dark');
				});
			});

			transition.ready.then(() => {
				document.documentElement.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${maxRad}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: 700,
						easing: 'ease-in-out',
						pseudoElement: '::view-transition-new(root)',
					}
				);
			});
		} else {
			setTheme(newTheme);
			setIsDarkMode(newTheme === 'dark');
		}
	};

	const lightPhrase = 'Vous êtes en mode lampe de bureau IKEA 💡';
	const darkPhrase = 'Vous êtes un développeur à 3h du matin 🦉';
	const mode = isMounted
		? resolvedTheme === 'dark'
			? 'Mode sombre'
			: 'Mode clair'
		: 'Quel mode ?';
	const phrase = isMounted
		? resolvedTheme === 'dark'
			? darkPhrase
			: lightPhrase
		: 'Choisissez entre la lumière et l’obscurité';

	return (
		<Card
			className={cn(
				'relative flex items-center justify-center gap-4 rounded-3xl px-8 py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<motion.button
				className="relative flex cursor-pointer items-center justify-center p-2"
				onClick={changeTheme}
				ref={buttonRef}
				transition={{
					type: 'spring',
					stiffness: 400,
					damping: 17,
				}}
				type="button"
				whileHover={{ scale: 1.15 }}
				whileTap={{ scale: 0.95 }}
			>
				<AnimatePresence initial={false} mode="wait">
					{isDarkMode ? (
						<motion.div
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: 90 }}
							initial={
								hasUserInteracted
									? { scale: 0, rotate: -90 }
									: { scale: 1, rotate: 0 }
							}
							key="sun"
							transition={
								hasUserInteracted
									? {
											type: 'spring',
											stiffness: 200,
											damping: 20,
											duration: 0.5,
										}
									: { duration: 0 }
							}
						>
							<SunIcon className="size-18 text-theme" weight="regular" />
						</motion.div>
					) : (
						<motion.div
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: -90 }}
							initial={
								hasUserInteracted
									? { scale: 0, rotate: 90 }
									: { scale: 1, rotate: 0 }
							}
							key="moon"
							transition={
								hasUserInteracted
									? {
											type: 'spring',
											stiffness: 200,
											damping: 20,
											duration: 0.5,
										}
									: { duration: 0 }
							}
						>
							<MoonIcon className="size-18 text-theme" weight="regular" />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>

			<div className="flex flex-col items-center justify-center gap-y-2">
				<h3 className="font-bold font-pixelify-sans text-theme text-xl md:text-3xl">
					{mode}
				</h3>
				<p className="text-center text-muted-foreground text-sm">{phrase}</p>
			</div>

			<Pattern />
		</Card>
	);
});
