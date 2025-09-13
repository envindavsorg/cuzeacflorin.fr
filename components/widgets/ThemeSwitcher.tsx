'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { memo } from 'react';
import useThemeTransition from '@/hooks/useThemeTransition';

export const ThemeSwitcher = memo((): React.JSX.Element => {
	const { isDarkMode, hasUserInteracted, buttonRef, changeTheme } =
		useThemeTransition();

	return (
		<motion.button
			animate={{ scale: 1.15 }}
			aria-label={isDarkMode ? 'Mode sombre' : 'Mode clair'}
			className="cursor-pointer"
			onClick={(event: React.MouseEvent<Element, MouseEvent> | undefined) => {
				event?.stopPropagation();
				changeTheme();
			}}
			ref={buttonRef}
			transition={{
				type: 'spring',
				stiffness: 400,
				damping: 17,
			}}
			type="button"
			whileTap={{ scale: 0.95 }}
		>
			<AnimatePresence initial={false} mode="wait">
				<motion.div
					animate={{ scale: 1, rotate: 0 }}
					exit={{ scale: 0, rotate: isDarkMode ? -90 : 90 }}
					initial={
						hasUserInteracted
							? { scale: 0, rotate: isDarkMode ? -90 : 90 }
							: { scale: 1, rotate: 0 }
					}
					key={isDarkMode ? 'sun' : 'moon'}
					transition={
						hasUserInteracted
							? {
									type: 'spring' as const,
									stiffness: 200,
									damping: 20,
									duration: 0.5,
								}
							: { duration: 0 }
					}
				>
					{isDarkMode ? (
						<SunIcon className="size-6 text-theme" />
					) : (
						<MoonIcon className="size-6" />
					)}
				</motion.div>
			</AnimatePresence>
		</motion.button>
	);
});
