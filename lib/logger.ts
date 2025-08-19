import { Logger } from 'tslog';
import { PROFILE_CONFIG } from '@/resources/profile';

const { NODE_ENV } = process.env;

export const logger: Logger<unknown> = new Logger({
	name: `Mon portfolio - ${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
	type: 'pretty',
	minLevel: NODE_ENV === 'production' ? 3 : 0,
});
