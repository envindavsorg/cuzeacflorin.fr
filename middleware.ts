import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import linguiConfig from './lingui.config';

const { locales } = linguiConfig;

const getRequestLocale = (requestHeaders: Headers): string => {
	const langHeader = requestHeaders.get('accept-language') || undefined;
	const languages = new Negotiator({
		headers: { 'accept-language': langHeader },
	}).languages();

	for (const lang of languages) {
		if (locales.includes(lang)) {
			return lang;
		}
		const baseLang = lang.split('-')[0];
		if (locales.includes(baseLang)) {
			return baseLang;
		}
	}

	return locales[0] || 'en';
};

export const middleware = (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) {
		const locale = pathname.split('/')[1];
		const response = NextResponse.next();
		response.headers.set('x-locale', locale);
		return response;
	}

	const locale = getRequestLocale(request.headers);
	request.nextUrl.pathname = `/${locale}${pathname}`;
	return NextResponse.redirect(request.nextUrl);
};

export const config = {
	matcher: [
		'/',
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
