import type { MetadataRoute } from 'next';
import { siteConfig } from '@/resources/site';

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: '*',
	},
	sitemap: `${siteConfig.url}/sitemap.xml`,
});

export default robots;
