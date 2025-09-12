'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { forwardRef, memo } from 'react';
import { Card } from '@/components/ui/Card';
import useThemeTransition from '@/hooks/useThemeTransition';
import { THEME_CONFIG } from '@/lib/theme';

type ThemeButtonProps = {
	isDarkMode: boolean;
	hasUserInteracted: boolean;
	onClick: (e?: React.MouseEvent) => void;
	mode: ThemeMode;
};

export const ThemeButton = memo(
	forwardRef<HTMLButtonElement, ThemeButtonProps>(
		({ isDarkMode, hasUserInteracted, onClick, mode }, ref) => (
			<div className="relative flex cursor-pointer flex-col items-center justify-center md:p-4 lg:gap-y-6 lg:p-8">
				<motion.button
					aria-label={isDarkMode ? 'Mode sombre' : 'Mode clair'}
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
								<SunIcon className="size-14 text-theme md:size-16" />
							) : (
								<MoonIcon className="size-14 md:size-16" />
							)}
						</motion.div>
					</AnimatePresence>
				</motion.button>
				<h3 className="font-archivo-black font-bold text-5xl tracking-wide max-lg:hidden">
					{mode}
				</h3>
			</div>
		)
	)
);

const { light, dark, fallback } = THEME_CONFIG;

export const ThemeSwitcher = memo((): React.JSX.Element => {
	const {
		isDarkMode,
		isMounted,
		hasUserInteracted,
		buttonRef,
		resolvedTheme,
		changeTheme,
	} = useThemeTransition();

	const getThemeConfig = () => {
		if (!isMounted) {
			return fallback;
		}
		return resolvedTheme === 'dark' ? dark : light;
	};

	const { mode } = getThemeConfig();

	return (
		<Card 
			className="flex h-full cursor-pointer flex-col items-center justify-center"
			onClick={changeTheme}
		>
			<ThemeButton
				hasUserInteracted={hasUserInteracted}
				isDarkMode={isDarkMode}
				mode={mode}
				onClick={(e) => {
					e?.stopPropagation();
					changeTheme();
				}}
				ref={buttonRef}
			/>
		</Card>
	);
});
