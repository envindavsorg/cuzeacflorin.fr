import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

type TimeParts = {
	hours: number;
	minutes: number;
	seconds: number;
};

type TimeStore = {
	time: Date;
	showSeparator: boolean;
	blinkInterval: NodeJS.Timeout | null;
	updateTime: () => void;
	toggleSeparator: () => void;
	startBlinking: () => void;
	stopBlinking: () => void;
	reset: () => void;
	getTimeParts: () => TimeParts;
	getTimeString: (format?: '12h' | '24h') => string;
};

const useTimeStore = create<TimeStore>()(
	devtools(
		persist(
			subscribeWithSelector((set, get) => ({
				time: new Date(),
				showSeparator: true,
				blinkInterval: null,
				updateTime: () => set({ time: new Date() }),
				toggleSeparator: () =>
					set((state) => ({ showSeparator: !state.showSeparator })),
				startBlinking: () => {
					const state = get();
					if (state.blinkInterval) {
						return;
					}

					const interval = setInterval(() => {
						get().toggleSeparator();
					}, 500);

					set({ blinkInterval: interval });
				},
				stopBlinking: () => {
					const { blinkInterval } = get();
					if (blinkInterval) {
						clearInterval(blinkInterval);
						set({ blinkInterval: null, showSeparator: true });
					}
				},
				reset: () => {
					get().stopBlinking();
					set({ time: new Date(), showSeparator: true });
				},
				getTimeParts: () => {
					const { time } = get();
					return {
						hours: time.getHours(),
						minutes: time.getMinutes(),
						seconds: time.getSeconds(),
					};
				},
				getTimeString: (format = '24h') => {
					const { time, showSeparator } = get();
					const separator = showSeparator ? ':' : ' ';

					if (format === '12h') {
						const hours = time.getHours();
						const period = hours >= 12 ? 'PM' : 'AM';
						const displayHours = hours % 12 || 12;
						const minutes = time.getMinutes().toString().padStart(2, '0');
						return `${displayHours}${separator}${minutes} ${period}`;
					}

					const hours = time.getHours().toString().padStart(2, '0');
					const minutes = time.getMinutes().toString().padStart(2, '0');
					const seconds = time.getSeconds().toString().padStart(2, '0');
					return `${hours}${separator}${minutes}${separator}${seconds}`;
				},
			})),
			{
				name: 'time-store',
				version: 1,
				partialize: (state) => ({
					showSeparator: state.showSeparator,
				}),
			}
		),
		{
			name: 'TimeStore',
			enabled: process.env.NODE_ENV === 'development',
		}
	)
);

export const useTime = () => useTimeStore((state) => state.time);
export const useHours = () => useTimeStore((state) => state.time.getHours());
export const useMinutes = () =>
	useTimeStore((state) => state.time.getMinutes());
export const useSeconds = () =>
	useTimeStore((state) => state.time.getSeconds());
export const useTimeParts = (): TimeParts => {
	const hours = useHours();
	const minutes = useMinutes();
	const seconds = useSeconds();

	return { hours, minutes, seconds };
};

export const useTimeString = (format?: '12h' | '24h') =>
	useTimeStore((state) => state.getTimeString(format));
export const useShowSeparator = () =>
	useTimeStore((state) => state.showSeparator);

export const timeActions = {
	updateTime: () => useTimeStore.getState().updateTime(),
	toggleSeparator: () => useTimeStore.getState().toggleSeparator(),
	startBlinking: () => useTimeStore.getState().startBlinking(),
	stopBlinking: () => useTimeStore.getState().stopBlinking(),
	reset: () => useTimeStore.getState().reset(),
};

export const useAutoUpdateTime = (intervalMs = 1000) => {
	const updateTime = useTimeStore((state) => state.updateTime);

	if (typeof window !== 'undefined') {
		const interval = setInterval(updateTime, intervalMs);
		return () => clearInterval(interval);
	}
};

export default useTimeStore;
