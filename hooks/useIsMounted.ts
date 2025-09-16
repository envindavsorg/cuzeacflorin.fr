import { useLayoutEffect, useState } from 'react';

const useIsMounted = (delay = 0): boolean => {
	const [isMounted, setIsMounted] = useState(false);

	useLayoutEffect(() => {
		setTimeout(() => {
			setIsMounted(true);
		}, delay);
	}, [delay]);

	return isMounted;
};

export default useIsMounted;
