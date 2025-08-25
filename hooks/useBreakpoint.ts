import { useEffect, useState } from 'react';
import { breakpoints } from '@/lib/consts';

const useBreakpoint = (): Breakpoints => {
	const [breakpoint, setBreakpoint] = useState<string>('');

	useEffect(() => {
		const handleResize = () => {
			const width: number = window.innerWidth;
			const newBreakpoint: string =
				Object.keys(breakpoints).find((key) => width > breakpoints[key]) ??
				'xxs';
			setBreakpoint(newBreakpoint);
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
