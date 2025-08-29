import { type NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const runtime = 'edge';

type WebVitalData = {
	name: string;
	value: number;
	rating: 'good' | 'needs-improvement' | 'poor';
	id: string;
	url: string;
	timestamp: number;
	userAgent: string;
	connectionType: string;
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		const vitalsData: WebVitalData = await req.json();

		if (!(vitalsData.name && vitalsData.value && vitalsData.id)) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		logger.info('Web Vitals Report', {
			metric: vitalsData.name,
			value: vitalsData.value,
			rating: vitalsData.rating,
			url: vitalsData.url,
			connectionType: vitalsData.connectionType,
			timestamp: new Date(vitalsData.timestamp).toISOString(),
		});

		return new NextResponse('OK', {
			status: 200,
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate',
				'X-Content-Type-Options': 'nosniff',
			},
		});
	} catch (error) {
		logger.error('Failed to process Web Vitals data', error);

		return NextResponse.json(
			{ error: 'Failed to process vitals data' },
			{
				status: 500,
				headers: {
					'Cache-Control': 'no-store, no-cache, must-revalidate',
					'X-Content-Type-Options': 'nosniff',
				},
			}
		);
	}
};
