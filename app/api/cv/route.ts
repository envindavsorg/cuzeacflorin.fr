import { statSync } from 'node:fs';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const FILE_NAME = '/cv/cv-cuzeac-florin.pdf';

export type CvMetadata = {
	sizeKB: number;
	lastModified: string;
	cached?: boolean;
};

interface CvMetadataError extends CvMetadata {
	error: string;
}

export const GET = (): NextResponse<CvMetadata | CvMetadataError> => {
	try {
		const pdfPath = join(process.cwd(), 'public', FILE_NAME);

		const { size, mtime } = statSync(pdfPath);
		const sizeKB = Math.round(size / 1024);
		const lastModified = mtime.toLocaleDateString('fr-FR');

		const fileAge = Date.now() - mtime.getTime();
		const maxAge = fileAge > 86_400_000 ? 3600 : 300;

		return NextResponse.json(
			{
				sizeKB,
				lastModified,
				cached: false,
			},
			{
				headers: {
					'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
					'X-Content-Type-Options': 'nosniff',
					'Last-Modified': mtime.toUTCString(),
					ETag: `"${mtime.getTime()}-${size}"`,
					Vary: 'Accept-Encoding',
				},
			}
		);
	} catch (error) {
		logger.error('Route /cv/metadata: Failed to read CV metadata', error);

		const errorMessage =
			error instanceof Error && 'code' in error && error.code === 'ENOENT'
				? 'CV file not found'
				: 'Failed to read CV metadata';

		const statusCode =
			error instanceof Error && 'code' in error && error.code === 'ENOENT'
				? 404
				: 500;

		return NextResponse.json(
			{
				sizeKB: 0,
				lastModified: new Date().toLocaleDateString('fr-FR'),
				error: errorMessage,
			},
			{
				status: statusCode,
				headers: {
					'Cache-Control': 'public, max-age=60, s-maxage=60',
					'X-Content-Type-Options': 'nosniff',
				},
			}
		);
	}
};
