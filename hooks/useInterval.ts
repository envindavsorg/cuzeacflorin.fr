import type React from 'react';
import { useEffect, useRef } from 'react';

type Delay = number | null;
type TimerHandler = (...args: unknown[]) => void;

const useInterval = (callback: TimerHandler, delay: Delay) => {
	const savedCallback: React.RefObject<TimerHandler> =
		useRef<TimerHandler>(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (delay === null) {
			return;
		}

		const handler = (...args: unknown[]): void => {
			savedCallback.current(...args);
		};

		const intervalId: NodeJS.Timeout = setInterval(handler, delay);
		return () => clearInterval(intervalId);
	}, [delay]);
};

export default useInterval;
