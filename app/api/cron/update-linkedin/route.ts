import { headers } from 'next/headers';
import { updateLinkedInFollowers } from '@/actions/linkedin.action';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(_request: Request) {
	try {
		const authHeader = (await headers()).get('authorization');

		if (
			process.env.CRON_SECRET &&
			authHeader !== `Bearer ${process.env.CRON_SECRET}`
		) {
			return Response.json({ error: 'Non autorisé' }, { status: 401 });
		}

		logger.info('🔄 Début du scraping LinkedIn...');

		const result = await updateLinkedInFollowers();

		if (result.success && result.followers) {
			logger.info(`✅ Followers récupérés: ${result.followers}`);

			return Response.json({
				success: true,
				followers: result.followers,
				updatedAt: new Date().toISOString(),
				message: `LinkedIn followers mis à jour: ${result.followers}`,
			});
		}

		logger.error('❌ Échec du scraping:', result.error);

		return Response.json(
			{
				success: false,
				error: result.error || 'Échec du scraping',
			},
			{ status: 500 }
		);
	} catch (error) {
		logger.error('❌ Erreur cron job:', error);

		return Response.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Erreur inconnue',
			},
			{ status: 500 }
		);
	}
}
