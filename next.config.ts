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
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
			'@phosphor-icons/react',
			'@radix-ui/react-hover-card',
			'@radix-ui/react-separator',
			'@radix-ui/react-slot',
			'zustand',
			'@number-flow/react',
			'@tsparticles/react',
			'@tsparticles/slim',
			'@tsparticles/engine',
			'web-vitals',
		],
		webpackBuildWorker: true,
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
	// biome-ignore lint/suspicious/useAwait: needed by Next.js
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
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
		];
	},
};

export default nextConfig;
