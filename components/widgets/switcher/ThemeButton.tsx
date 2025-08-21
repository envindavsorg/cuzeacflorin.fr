'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, memo } from 'react';

type ThemeButtonProps = {
	isDarkMode: boolean;
	hasUserInteracted: boolean;
	onClick: () => void;
};

export const ThemeButton = memo(
	forwardRef<HTMLButtonElement, ThemeButtonProps>(
		({ isDarkMode, hasUserInteracted, onClick }, ref) => {
			const iconTransition = hasUserInteracted
				? {
						type: 'spring' as const,
						stiffness: 200,
						damping: 20,
						duration: 0.5,
					}
				: { duration: 0 };

			return (
				<motion.button
					className="relative flex cursor-pointer items-center justify-center p-2"
					onClick={onClick}
					ref={ref}
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
								transition={iconTransition}
							>
								<SunIcon
									className="size-18 text-theme"
									weight="regular"
								/>
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
								transition={iconTransition}
							>
								<MoonIcon
									className="size-18 text-theme"
									weight="regular"
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
			);
		},
	),
);

ThemeButton.displayName = 'ThemeButton';
