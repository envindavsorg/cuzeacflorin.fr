import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
	const host = request.headers.get('host');

	if (host === 'assets.cuzeacflorin.fr') {
		return NextResponse.rewrite(
			new URL(`/assets${request.nextUrl.pathname}`, request.url)
		);
	}
};

export const config = {
	matcher: '/:path*',
};
