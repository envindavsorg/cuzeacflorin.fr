import type { MetadataRoute } from 'next';
import { baseURL } from '@/resources/meta';

const robots = (): MetadataRoute.Robots => ({
	rules: {
		userAgent: '*',
	},
	sitemap: `${baseURL}/sitemap.xml`,
});

export default robots;
