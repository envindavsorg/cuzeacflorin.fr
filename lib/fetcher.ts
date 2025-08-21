import { logger } from '@/lib/logger';

export const fetcher = async (
	url: string | URL | Request
): Promise<Response> => {
	const response: Response = await fetch(url);

	if (!response.ok) {
		logger.error('Failed to fetch requested url ...');
		throw new Error('Failed to fetch requested url ...');
	}

	return response.json();
};
