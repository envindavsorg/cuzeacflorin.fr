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
	const { theme, setTheme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		setIsDarkMode(theme === 'dark');
	}, [theme]);

	const changeTheme = () => {
		if (!buttonRef.current) {
			return;
		}

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
							initial={{ scale: 0, rotate: -90 }}
							key="sun"
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 20,
								duration: 0.5,
							}}
						>
							<SunIcon className="size-18 text-current" weight="regular" />
						</motion.div>
					) : (
						<motion.div
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: -90 }}
							initial={{ scale: 0, rotate: 90 }}
							key="moon"
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 20,
								duration: 0.5,
							}}
						>
							<MoonIcon className="size-18 text-current" weight="regular" />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>

			<Pattern />
		</Card>
	);
});
