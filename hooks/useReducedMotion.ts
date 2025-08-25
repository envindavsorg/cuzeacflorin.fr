import { useEffect, useState } from 'react';

const PLATFORM_REGEX: RegExp =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const useReducedMotion = (): boolean => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		const isMobile =
			PLATFORM_REGEX.test(navigator.userAgent) || window.innerWidth < 768;

		setPrefersReducedMotion(mediaQuery.matches || isMobile);

		const handleChange = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches || isMobile);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	return prefersReducedMotion;
};

export default useReducedMotion;
