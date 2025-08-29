const CACHE_DURATION = 5 * 60 * 1000;

type CacheEntry<T> = {
	data: T;
	timestamp: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export const getCachedData = <T>(
	key: string,
	duration = CACHE_DURATION
): T | null => {
	const entry = cache.get(key);
	if (!entry) {
		return null;
	}

	if (Date.now() - entry.timestamp > duration) {
		cache.delete(key);
		return null;
	}

	return entry.data as T;
};

export const setCachedData = <T>(key: string, data: T): void => {
	cache.set(key, {
		data,
		timestamp: Date.now(),
	});
};

export const clearCache = (): void => cache.clear();
export const deleteCacheEntry = (key: string): boolean => cache.delete(key);
export const getCacheSize = (): number => cache.size;
