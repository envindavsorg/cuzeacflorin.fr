import { useLayoutEffect, useState } from 'react';

const useMounted = (delay = 0) => {
	const [isMounted, setIsMounted] = useState(false);

	useLayoutEffect(() => {
		setTimeout(() => {
			setIsMounted(true);
		}, delay);
	}, [delay]);

	return isMounted;
};

export default useMounted;
