'use client';

import { MonitorIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

const THEME_OPTIONS = [
	{
		icon: <SunIcon weight="duotone" />,
		value: 'light',
	},
	{
		icon: <MoonIcon weight="duotone" />,
		value: 'dark',
	},
	{
		icon: <MonitorIcon weight="duotone" />,
		value: 'system',
	},
];

const ThemeOption = ({
	icon,
	value,
	isActive,
	onClick,
}: {
	icon: React.ReactNode;
	value: string;
	isActive?: boolean;
	onClick: (value: string) => void;
}): React.JSX.Element => (
	<button
		aria-checked={isActive}
		aria-label={value}
		className={cn(
			'relative flex size-10 items-center justify-center rounded-full transition-all',
			'[&_svg]:size-5 [&_svg]:cursor-pointer',
			isActive
				? 'text-zinc-950 dark:text-zinc-50'
				: 'text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50'
		)}
		onClick={() => onClick(value)}
		role="radio"
		type="button"
	>
		{icon}

		{isActive && (
			<motion.div
				className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700"
				layoutId="theme-option"
				transition={{
					type: 'spring',
					bounce: 0.3,
					duration: 0.6,
				}}
			/>
		)}
	</button>
);

export const ThemeSwitcher = (): React.JSX.Element => {
	const { theme, setTheme } = useTheme();

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <div className="flex h-8 w-24" />;
	}

	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="inline-flex items-center overflow-hidden rounded-full bg-white ring-1 ring-zinc-200 ring-inset dark:bg-zinc-950 dark:ring-zinc-700"
			initial={{ opacity: 0 }}
			key={String(isMounted)}
			role="radiogroup"
			transition={{ duration: 0.3 }}
		>
			{THEME_OPTIONS.map((option) => (
				<ThemeOption
					icon={option.icon}
					isActive={theme === option.value}
					key={option.value}
					onClick={setTheme}
					value={option.value}
				/>
			))}
		</motion.div>
	);
};
