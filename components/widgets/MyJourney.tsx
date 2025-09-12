import type React from 'react';
import { memo } from 'react';
import { BlogArticle } from '@/components/elements/BlogArticle';
import { Card } from '@/components/ui/Card';
import { getLatestPost } from '@/lib/posts';

export const MyJourney = memo((): React.JSX.Element => {
	const { metadata, slug, reading } = getLatestPost();

	return (
		<Card className="flex h-full flex-col justify-center px-6 py-3">
			<BlogArticle metadata={metadata} reading={reading} slug={slug} />
		</Card>
	);
});
