// app/actions/linkedin-actions.ts
'use server';

import { del, list, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { chromium } from 'playwright';
import { logger } from '@/lib/logger';
import { PROFILE_CONFIG } from '@/resources/profile';

const { linkedin } = PROFILE_CONFIG;

type LinkedInData = {
	count: number;
	updatedAt: string;
};

const BLOB_FILENAME = 'linkedin-followers.json';

export async function updateLinkedInFollowers() {
	try {
		const browser = await chromium.launch({
			headless: true,
		});

		const page = await browser.newPage();

		await page.goto(linkedin.url);
		await page.waitForLoadState('networkidle');

		const followers = await page
			.locator('text=/\\d+\\s*abonnés?/i')
			.first()
			.textContent();

		// biome-ignore lint/correctness/useParseIntRadix: remove later
		const followersCount = Number.parseInt(
			followers?.replace(/\D/g, '') || '0'
		);

		await browser.close();

		const data: LinkedInData = {
			count: followersCount,
			updatedAt: new Date().toISOString(),
		};

		const { blobs } = await list({
			prefix: BLOB_FILENAME,
			limit: 1,
		});

		if (blobs.length > 0) {
			await del(blobs[0].url);
		}

		await put(BLOB_FILENAME, JSON.stringify(data), {
			access: 'public',
			contentType: 'application/json',
			addRandomSuffix: false,
		});

		revalidatePath('/');

		return { success: true, followers: followersCount };
	} catch (error) {
		logger.error('Erreur scraping LinkedIn:', error);
		return { success: false, error: 'Échec du scraping' };
	}
}

export async function getLinkedInFollowers(): Promise<LinkedInData> {
	try {
		const { blobs } = await list({
			prefix: BLOB_FILENAME,
			limit: 1,
		});

		if (blobs.length === 0) {
			return { count: 0, updatedAt: new Date().toISOString() };
		}

		const response = await fetch(blobs[0].url);

		if (!response.ok) {
			throw new Error('Erreur récupération blob');
		}

		return (await response.json()) as LinkedInData;
	} catch (error) {
		logger.error('Erreur lecture blob:', error);
		return { count: 0, updatedAt: new Date().toISOString() };
	}
}
