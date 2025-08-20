import { del, list, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const BLOB_FILENAME = 'linkedin-followers.json';

export const GET = async () => {
	try {
		const { blobs } = await list({
			prefix: BLOB_FILENAME,
			limit: 1,
		});

		if (blobs.length === 0) {
			return Response.json({
				count: 0,
				updatedAt: new Date().toISOString(),
			});
		}

		const response = await fetch(blobs[0].url);
		const data = await response.json();

		return Response.json(data);
	} catch (error) {
		return Response.json(
			{ error: 'Erreur lors de la récupération' },
			{ status: 500 }
		);
	}
};

export const POST = async (request: Request) => {
	try {
		const authHeader = (await headers()).get('authorization');

		if (!(authHeader && authHeader.startsWith('Bearer '))) {
			return Response.json(
				{ error: 'Token manquant ou invalide' },
				{ status: 401 }
			);
		}

		const token = authHeader.split(' ')[1];

		if (token !== process.env.API_TOKEN) {
			return Response.json({ error: 'Token invalide' }, { status: 401 });
		}

		const { count } = await request.json();

		if (typeof count !== 'number' || count < 0 || count > 10_000_000) {
			return Response.json(
				{ error: 'Count invalide (doit être un nombre entre 0 et 10000000)' },
				{ status: 400 }
			);
		}

		const data = {
			count,
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

		return Response.json({
			success: true,
			count,
			updatedAt: data.updatedAt,
			message: `Followers mis à jour: ${count}`,
		});
	} catch (error) {
		console.error('❌ Erreur:', error);

		return Response.json(
			{
				error: 'Erreur serveur',
				details: error instanceof Error ? error.message : 'Erreur inconnue',
			},
			{ status: 500 }
		);
	}
};
