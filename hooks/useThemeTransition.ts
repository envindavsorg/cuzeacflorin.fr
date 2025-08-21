'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const useThemeTransition = () => {
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
			const maxRad = Math.hypot(
				Math.max(left, right),
				Math.max(top, bottom),
			);

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
					},
				);
			});
		} else {
			setTheme(newTheme);
			setIsDarkMode(newTheme === 'dark');
		}
	};

	return {
		isDarkMode,
		isMounted,
		hasUserInteracted,
		buttonRef,
		resolvedTheme,
		changeTheme,
	};
};

export default useThemeTransition;
