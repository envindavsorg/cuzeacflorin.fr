'use server';

import { list } from '@vercel/blob';
import { logger } from '@/lib/logger';

type LinkedInData = {
	count: number;
	updatedAt: string;
};

const BLOB_FILENAME = 'linkedin-followers.json';

export const getLinkedInFollowers = async (): Promise<LinkedInData> => {
	try {
		const { blobs } = await list({
			prefix: BLOB_FILENAME,
			limit: 1,
		});

		if (blobs.length === 0) {
			return {
				count: 0,
				updatedAt: new Date().toISOString(),
			};
		}

		const response = await fetch(blobs[0].url);

		if (!response.ok) {
			throw new Error('Erreur récupération blob');
		}

		return (await response.json()) as LinkedInData;
	} catch (error) {
		logger.error('Erreur lecture blob:', error);

		return {
			count: 0,
			updatedAt: new Date().toISOString(),
		};
	}
};
