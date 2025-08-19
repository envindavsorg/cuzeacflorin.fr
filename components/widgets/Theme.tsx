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

export const Theme = memo((): React.JSX.Element => {
	const { theme, setTheme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		setIsDarkMode(theme === 'dark');
	}, [theme]);

	const changeTheme = async () => {
		if (!buttonRef.current) return;

		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);

		if (document.startViewTransition && buttonRef.current) {
			await document.startViewTransition(() => {
				flushSync(() => {
					setIsDarkMode(newTheme === 'dark');
				});
			}).ready;

			const { top, left, width, height } =
				buttonRef.current.getBoundingClientRect();
			const y = top + height / 2;
			const x = left + width / 2;
			const right = window.innerWidth - left;
			const bottom = window.innerHeight - top;
			const maxRad = Math.hypot(
				Math.max(left, right),
				Math.max(top, bottom),
			);

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
				},
			);
		} else {
			setIsDarkMode(newTheme === 'dark');
		}
	};

	return (
		<Card
			className={cn(
				'relative flex items-center justify-center gap-4 rounded-3xl px-8 py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<motion.button
				ref={buttonRef}
				onClick={changeTheme}
				className="relative flex cursor-pointer items-center justify-center p-2"
				whileHover={{ scale: 1.15 }}
				whileTap={{ scale: 0.95 }}
				transition={{
					type: 'spring',
					stiffness: 400,
					damping: 17,
				}}
				type="button"
			>
				<AnimatePresence mode="wait" initial={false}>
					{isDarkMode ? (
						<motion.div
							key="sun"
							initial={{ scale: 0, rotate: -90 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: 90 }}
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 20,
								duration: 0.5,
							}}
						>
							<SunIcon
								weight="regular"
								className="size-18 text-current"
							/>
						</motion.div>
					) : (
						<motion.div
							key="moon"
							initial={{ scale: 0, rotate: 90 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: -90 }}
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 20,
								duration: 0.5,
							}}
						>
							<MoonIcon
								weight="regular"
								className="size-18 text-current"
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>

			<Pattern />
		</Card>
	);
});
