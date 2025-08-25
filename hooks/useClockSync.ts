import { useEffect } from 'react';
import useTimeStore from '@/stores/time.store';

const useClockSync = (): void => {
	const { updateTime, startBlinking, stopBlinking } = useTimeStore();

	useEffect(() => {
		const delay: number = 1000 - (Date.now() % 1000);
		let interval: NodeJS.Timeout;

		updateTime();
		startBlinking();

		const timeout = setTimeout(() => {
			updateTime();
			interval = setInterval(updateTime, 1000);
		}, delay);

		return () => {
			clearTimeout(timeout);
			if (interval) {
				clearInterval(interval);
			}
			stopBlinking();
		};
	}, [updateTime, startBlinking, stopBlinking]);
};

export default useClockSync;
