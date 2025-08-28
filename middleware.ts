import { type NextRequest, NextResponse } from 'next/server';

const FORMAT_REGEX: RegExp =
	/\.(js|css|woff2|woff|ttf|otf|eot|svg|ico|png|jpg|jpeg|gif|webp|avif)$/;

export const middleware = (request: NextRequest): NextResponse => {
	const response = NextResponse.next();
	const url = request.nextUrl;

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-DNS-Prefetch-Control', 'on');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=()'
	);

	if (url.pathname.match(FORMAT_REGEX)) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=31536000, immutable'
		);
	}

	if (url.pathname.endsWith('.html') || url.pathname === '/') {
		response.headers.set(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=59'
		);
	}

	const startTime = Date.now();
	response.headers.set('Server-Timing', `middleware;dur=${startTime}`);

	return response;
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
