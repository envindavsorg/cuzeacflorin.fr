import { logger } from '@/lib/logger';

export const fetcher = async <T>(url: string | URL | Request): Promise<T> => {
	const response = await fetch(url);
	if (!response.ok) {
		const error = `Failed to fetch: ${response.status} ${response.statusText}`;
		logger.error(error, { url: url.toString(), status: response.status });
		throw new Error(error);
	}

	return (await response.json()) as Promise<T>;
};
