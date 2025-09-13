'use client';

import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { memo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import useThemeTransition from '@/hooks/useThemeTransition';

export const ThemeSwitcher = memo((): React.JSX.Element => {
	const { isDarkMode, hasUserInteracted, buttonRef, changeTheme } =
		useThemeTransition();
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Card
			className="relative h-full transform overflow-hidden transition duration-200 ease-in-out hover:scale-100"
			onClick={changeTheme}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.button
				animate={{ scale: isHovered ? 1.15 : 1 }}
				aria-label={isDarkMode ? 'Mode sombre' : 'Mode clair'}
				className="flex h-full w-full cursor-pointer items-center justify-center"
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
							<SunIcon className="text-theme sm:size-12 md:size-16" />
						) : (
							<MoonIcon className="sm:size-12 md:size-16" />
						)}
					</motion.div>
				</AnimatePresence>
			</motion.button>
		</Card>
	);
});
