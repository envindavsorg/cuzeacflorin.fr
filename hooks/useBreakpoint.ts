import { useEffect, useState } from 'react';
import { breakpoints } from '@/lib/consts';

const orderedEntries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);

const pickBreakpoint = (width: number): string => {
	let picked = 'sm';
	for (const [key, val] of orderedEntries) {
		if (width >= val) {
			picked = key;
		}
	}
	return picked;
};

const useBreakpoint = (): Breakpoints => {
	const [breakpoint, setBreakpoint] = useState<string>('');

	useEffect(() => {
		const handleResize = () => {
			const width: number = window.innerWidth;
			setBreakpoint(pickBreakpoint(width));
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		breakpoint,
		setBreakpoint,
	};
};

export default useBreakpoint;
