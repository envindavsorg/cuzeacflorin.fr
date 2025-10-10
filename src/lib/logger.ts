import { Logger } from 'tslog';

const { NODE_ENV } = process.env;

export const logger: Logger<unknown> = new Logger({
	name: 'Mon portfolio - Cuzeac Florin',
	type: 'pretty',
	minLevel: NODE_ENV === 'production' ? 3 : 0,
});
