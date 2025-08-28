'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { forwardRef, memo } from 'react';
import { Card } from '@/components/ui/Card';
import useThemeTransition from '@/hooks/useThemeTransition';
import { cn } from '@/lib/utils';

const THEME_CONFIG = {
	light: { mode: 'Sombre' },
	dark: { mode: 'Clair' },
	fallback: { mode: 'Mode ?' },
} as const;

type ThemeDisplayProps = {
	isMounted: boolean;
	resolvedTheme: string | undefined;
};

export const ThemeDisplay = memo(
	({ isMounted, resolvedTheme }: ThemeDisplayProps): React.JSX.Element => {
		const getThemeConfig = () => {
			if (!isMounted) {
				return THEME_CONFIG.fallback;
			}
			return resolvedTheme === 'dark' ? THEME_CONFIG.dark : THEME_CONFIG.light;
		};

		const { mode } = getThemeConfig();

		return (
			<h3 className="font-archivo-black font-bold text-5xl tracking-wide max-lg:hidden">
				{mode}
			</h3>
		);
	}
);

ThemeDisplay.displayName = 'ThemeDisplay';

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
								<SunIcon className="size-16 text-[#FCE24A]" />
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
								<MoonIcon className="size-16" />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
			);
		}
	)
);

ThemeButton.displayName = 'ThemeButton';

export const ThemeSwitcher = memo((): React.JSX.Element => {
	const {
		isDarkMode,
		isMounted,
		hasUserInteracted,
		buttonRef,
		resolvedTheme,
		changeTheme,
	} = useThemeTransition();

	return (
		<Card
			className={cn(
				'h-full md:p-4 lg:p-8',
				'flex flex-col items-center justify-center lg:gap-y-6'
			)}
			pattern
		>
			<ThemeButton
				hasUserInteracted={hasUserInteracted}
				isDarkMode={isDarkMode}
				onClick={changeTheme}
				ref={buttonRef}
			/>
			<ThemeDisplay isMounted={isMounted} resolvedTheme={resolvedTheme} />
		</Card>
	);
});

ThemeSwitcher.displayName = 'ThemeSwitcher';
