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
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
	},
	compress: true,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: false,
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
