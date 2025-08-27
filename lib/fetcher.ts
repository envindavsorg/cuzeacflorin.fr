import { logger } from '@/lib/logger';

export const fetcher = async <T = any>(
	url: string | URL | Request
): Promise<T> => {
	const response: Response = await fetch(url);

	if (!response.ok) {
		logger.error('Failed to fetch requested url ...');
		throw new Error('Failed to fetch requested url ...');
	}

	return response.json() as Promise<T>;
};
