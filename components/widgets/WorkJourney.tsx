import type React from 'react';
import { memo } from 'react';
import { BlogArticle } from '@/components/elements/BlogArticle';
import { Card } from '@/components/ui/Card';
import { getFirstPost } from '@/lib/posts';
import { cn } from '@/lib/utils';

export const WorkJourney = memo((): React.JSX.Element => {
	const { metadata, slug, reading } = getFirstPost();

	return (
		<Card
			className={cn(
				'h-full px-6 py-5 md:py-6 lg:px-8 lg:py-8',
				'flex items-center justify-center'
			)}
		>
			<BlogArticle metadata={metadata} reading={reading} slug={slug} />
		</Card>
	);
});

WorkJourney.displayName = 'WorkJourney';
