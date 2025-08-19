type Color = [number, number, number];
export const light: Color = [1, 1, 1];
export const dark: Color = [0, 0, 0];
export const yellow: Color = [252 / 255, 211 / 255, 77 / 255];
export const orange: Color = [234 / 255, 88 / 255, 12 / 255];

export const physics = {
	type: 'spring',
	mass: 1,
	stiffness: 280,
	damping: 40,
};
