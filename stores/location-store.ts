import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface LocationState {
	isGlobeHovered: boolean;
	setGlobeHovered: (hovered: boolean) => void;
	reset: () => void;
}

export const useLocationStore = create<LocationState>()(
	subscribeWithSelector((set) => ({
		isGlobeHovered: false,
		setGlobeHovered: (isGlobeHovered) => set({ isGlobeHovered }),
		reset: () => set({ isGlobeHovered: false }),
	})),
);

export const selectIsGlobeHovered = (state: LocationState) =>
	state.isGlobeHovered;
export const selectSetGlobeHovered = (state: LocationState) =>
	state.setGlobeHovered;
