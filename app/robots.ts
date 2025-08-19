import type { MetadataRoute } from 'next';
import { siteConfig } from '@/resources/site';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
		},
		sitemap: `${siteConfig.url}/sitemap.xml`,
	};
}
