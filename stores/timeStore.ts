import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

type TimeParts = {
	hours: number;
	minutes: number;
	seconds: number;
};

type TimeState = {
	timeParts: TimeParts;
	lastUpdated: number;
	isActive: boolean;
	timezone: string;
};

type TimeActions = {
	setTimeParts: (timeParts: TimeParts) => void;
	updateTime: () => void;
	setActive: (active: boolean) => void;
	reset: () => void;
};

interface TimeStore extends TimeState, TimeActions {}

const getTimeParts = (date: Date = new Date()): TimeParts => ({
	hours: date.getHours(),
	minutes: date.getMinutes(),
	seconds: date.getSeconds(),
});

const getInitialState = (): TimeState => ({
	timeParts: getTimeParts(),
	lastUpdated: Date.now(),
	isActive: true,
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

export const useTimeStore = create<TimeStore>()(
	devtools(
		persist(
			subscribeWithSelector((set, get) => ({
				...getInitialState(),

				setTimeParts: (timeParts: TimeParts) =>
					set(
						{
							timeParts,
							lastUpdated: Date.now(),
						},
						false,
						'setTimeParts'
					),

				updateTime: () => {
					const state = get();
					if (!state.isActive) {
						return;
					}

					const newTimeParts = getTimeParts();
					set(
						{
							timeParts: newTimeParts,
							lastUpdated: Date.now(),
						},
						false,
						'updateTime'
					);
				},

				setActive: (isActive: boolean) => set({ isActive }, false, 'setActive'),

				reset: () => set(getInitialState(), false, 'reset'),
			})),
			{
				name: 'time-store',
				version: 1,
				partialize: (state) => ({
					timezone: state.timezone,
					isActive: state.isActive,
				}),
				merge: (persistedState, currentState) => ({
					...currentState,
					...(persistedState || {}),
					timeParts: getTimeParts(),
					lastUpdated: Date.now(),
				}),
			}
		),
		{
			name: 'TimeStore',
			enabled: process.env.NODE_ENV === 'development',
		}
	)
);

export const useTimeSelectors = {
	hours: () => useTimeStore((state) => state.timeParts.hours),
	minutes: () => useTimeStore((state) => state.timeParts.minutes),
	seconds: () => useTimeStore((state) => state.timeParts.seconds),

	timeString: () =>
		useTimeStore((state) => {
			const { hours, minutes, seconds } = state.timeParts;
			return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
		}),

	time12h: () =>
		useTimeStore((state) => {
			const { hours, minutes } = state.timeParts;
			const period = hours >= 12 ? 'PM' : 'AM';
			const displayHours = hours % 12 || 12;
			return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
		}),

	isActive: () => useTimeStore((state) => state.isActive),
	lastUpdated: () => useTimeStore((state) => state.lastUpdated),
	timezone: () => useTimeStore((state) => state.timezone),

	timeWithActivity: () =>
		useTimeStore((state) => ({
			timeParts: state.timeParts,
			isActive: state.isActive,
		})),

	displayData: () =>
		useTimeStore((state) => ({
			hours: state.timeParts.hours,
			minutes: state.timeParts.minutes,
			seconds: state.timeParts.seconds,
			isActive: state.isActive,
		})),
};

export const timeActions = {
	updateTime: () => useTimeStore.getState().updateTime(),
	setActive: (active: boolean) => useTimeStore.getState().setActive(active),
	reset: () => useTimeStore.getState().reset(),
};
