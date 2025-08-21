import { del, list, put } from '@vercel/blob';
import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';

const BLOB_FILENAME = 'linkedin-followers.json';
const CACHE_TAG = 'linkedin-followers';
const MAX_COUNT = 10_000_000;
const MIN_COUNT = 0;

export const GET = async (_request: NextRequest) => {
	try {
		const headers = new Headers();
		headers.set(
			'Cache-Control',
			'public, s-maxage=3600, stale-while-revalidate=7200'
		);
		headers.set('CDN-Cache-Control', 'max-age=3600');
		headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');

		const { blobs } = await list({
			prefix: BLOB_FILENAME,
			limit: 1,
		});

		if (blobs.length === 0) {
			return Response.json(
				{
					count: 0,
					updatedAt: new Date().toISOString(),
				},
				{ headers }
			);
		}

		const response = await fetch(blobs[0].url, {
			cache: 'force-cache',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (!data || typeof data.count !== 'number') {
			throw new Error('Invalid data structure');
		}

		return Response.json(data, { headers });
	} catch (error) {
		logger.error('GET /api/linkedin error:', error);
		return Response.json(
			{
				error: 'Erreur lors de la récupération',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
};

export const POST = async (request: Request) => {
	try {
		const authHeader = (await headers()).get('authorization');

		if (!authHeader?.startsWith('Bearer ')) {
			return Response.json(
				{ error: 'Token manquant ou invalide' },
				{ status: 401 }
			);
		}

		const token = authHeader.split(' ')[1];

		if (token !== process.env.API_TOKEN) {
			return Response.json({ error: 'Token invalide' }, { status: 401 });
		}

		let body: any;
		try {
			body = await request.json();
		} catch {
			return Response.json(
				{ error: 'Corps de requête invalide' },
				{ status: 400 }
			);
		}

		const { count } = body;

		if (typeof count !== 'number' || !Number.isInteger(count)) {
			return Response.json(
				{ error: 'Count doit être un nombre entier' },
				{ status: 400 }
			);
		}

		if (count < MIN_COUNT || count > MAX_COUNT) {
			return Response.json(
				{ error: `Count doit être entre ${MIN_COUNT} et ${MAX_COUNT}` },
				{ status: 400 }
			);
		}

		const data = {
			count,
			updatedAt: new Date().toISOString(),
		};

		const [{ blobs }] = await Promise.all([
			list({
				prefix: BLOB_FILENAME,
				limit: 1,
			}),
		]);

		if (blobs.length > 0) {
			await del(blobs[0].url);
		}

		await put(BLOB_FILENAME, JSON.stringify(data), {
			access: 'public',
			contentType: 'application/json',
			addRandomSuffix: false,
			cacheControlMaxAge: 3600,
		});

		await Promise.all([revalidatePath('/'), revalidateTag(CACHE_TAG)]);

		return Response.json({
			success: true,
			count,
			updatedAt: data.updatedAt,
			message: `Followers mis à jour: ${count.toLocaleString('fr-FR')}`,
		});
	} catch (error) {
		logger.error('POST /api/linkedin error:', error);

		if (error instanceof Error && error.message.includes('BLOB_STORE')) {
			return Response.json(
				{
					error: 'Erreur de stockage',
					details: 'Impossible de mettre à jour les données',
				},
				{ status: 503 }
			);
		}

		return Response.json(
			{
				error: 'Erreur serveur',
				details: error instanceof Error ? error.message : 'Erreur inconnue',
			},
			{ status: 500 }
		);
	}
};
