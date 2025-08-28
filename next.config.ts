import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	pageExtensions: ['mdx', 'ts', 'tsx'],
	transpilePackages: ['next-mdx-remote'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'www.cuzeacflorin.fr',
			},
		],
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	compress: true,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		mdxRs: true,
		optimizePackageImports: [
			'motion',
			'@radix-ui/react-avatar',
			'@radix-ui/react-tooltip',
			'@radix-ui/react-hover-card',
			'@radix-ui/react-separator',
			'@radix-ui/react-slot',
			'zustand',
			'@number-flow/react',
			'@tsparticles/react',
			'@tsparticles/slim',
			'@tsparticles/engine',
			'react-grid-layout',
			'react-map-gl',
			'mapbox-gl',
			'octokit',
			'sonner',
			'swr',
			'web-vitals',
		],
		webpackBuildWorker: true,
		cssChunking: 'strict',
		serverComponentsHmrCache: false,
		staleTimes: {
			dynamic: 30,
			static: 180,
		},
	},
	productionBrowserSourceMaps: false,
	compiler: {
		removeConsole:
			process.env.NODE_ENV === 'production'
				? {
						exclude: ['error', 'warn'],
					}
				: false,
	},
	onDemandEntries: {
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 2,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
			{
				source: '/:path*.{js,css,woff2}',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/images/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, s-maxage=10, stale-while-revalidate=59',
					},
				],
			},
		];
	},
};

export default nextConfig;
