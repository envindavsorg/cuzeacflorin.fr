import type { MetadataRoute } from 'next';
import { baseURL } from '@/resources/meta';

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: '*',
		allow: '/',
		disallow: ['/api/', '/_next/'],
	},
	sitemap: `https://${baseURL}/sitemap.xml`,
	host: `https://${baseURL}`,
});

export default robots;
