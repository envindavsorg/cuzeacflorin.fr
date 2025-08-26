'use server';

import { list } from '@vercel/blob';
import { unstable_cache } from 'next/cache';
import { logger } from '@/lib/logger';

export type LinkedInData = {
	count: number;
	updatedAt: string;
};

const BLOB_FILENAME = 'linkedin-followers.json';
const FALLBACK_COUNT = 0;
const CACHE_TAG = 'linkedin-followers';
const CACHE_REVALIDATE = 3600;

let memoryCache: { data: LinkedInData | null; timestamp: number } = {
	data: null,
	timestamp: 0,
};

const MEMORY_CACHE_TTL = 60 * 1000;

const fetchLinkedInData = async (): Promise<LinkedInData> => {
	try {
		const now = Date.now();
		if (memoryCache.data && now - memoryCache.timestamp < MEMORY_CACHE_TTL) {
			return memoryCache.data;
		}

		const { blobs } = await list({
			prefix: BLOB_FILENAME,
			limit: 1,
		});

		if (blobs.length === 0) {
			return {
				count: FALLBACK_COUNT,
				updatedAt: new Date().toISOString(),
			};
		}

		const response = await fetch(blobs[0].url, {
			next: {
				revalidate: CACHE_REVALIDATE,
				tags: [CACHE_TAG],
			},
			cache: 'force-cache',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = (await response.json()) as LinkedInData;

		if (typeof data.count !== 'number' || !data.updatedAt) {
			throw new Error('Invalid data structure');
		}

		memoryCache = {
			data,
			timestamp: now,
		};

		return data;
	} catch (error) {
		logger.error('LinkedIn data fetch error:', error);

		if (memoryCache.data) {
			return memoryCache.data;
		}

		return {
			count: FALLBACK_COUNT,
			updatedAt: new Date().toISOString(),
		};
	}
};

export const getLinkedInFollowers = unstable_cache(
	fetchLinkedInData,
	[CACHE_TAG],
	{
		revalidate: CACHE_REVALIDATE,
		tags: [CACHE_TAG],
	}
);
