import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: ['next-mdx-remote'],
	allowedDevOrigins: ['MacBook-Pro-16-M4-Max-de-Florin.local'],
	pageExtensions: ['mdx', 'ts', 'tsx'],
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'cuzeacflorin.fr',
			},
		],
		qualities: [75, 100],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	turbopack: {
		rules: {
			'*.po': {
				loaders: ['@lingui/loader'],
				as: '*.js',
			},
		},
	},
	experimental: {
		swcPlugins: [['@lingui/swc-plugin', {}]],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.po$/,
			use: '@lingui/loader',
		});
		return config;
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/fr',
				permanent: false,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/blog/:slug.mdx',
				destination: '/blog.mdx/:slug',
			},
			{
				source: '/components/:slug.mdx',
				destination: '/blog.mdx/:slug',
			},
		];
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
