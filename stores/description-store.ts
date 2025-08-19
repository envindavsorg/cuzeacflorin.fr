import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface DescriptionState {
	hovering: boolean;
	active: boolean;
	setHovering: (hovering: boolean) => void;
	setActive: (active: boolean) => void;
	reset: () => void;
}

export const useDescriptionStore = create<DescriptionState>()(
	subscribeWithSelector((set) => ({
		hovering: false,
		active: false,
		setHovering: (hovering) => set({ hovering }),
		setActive: (active) => set({ active }),
		reset: () => set({ hovering: false, active: false }),
	})),
);

export const selectHovering = (state: DescriptionState) => state.hovering;
export const selectActive = (state: DescriptionState) => state.active;
export const selectSetHovering = (state: DescriptionState) => state.setHovering;
export const selectSetActive = (state: DescriptionState) => state.setActive;
