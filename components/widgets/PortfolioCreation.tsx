import type React from 'react';
import { memo } from 'react';
import { PortfolioMockup } from '@/components/assets/PortfolioMockup';
import { Card, CardLink } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { getFirstProject } from '@/lib/projects';
import { extractSentence, formatDate, WORDS_REGEX } from '@/lib/utils';

export const PortfolioCreation = memo((): React.JSX.Element => {
	const { metadata, slug } = getFirstProject();
	const [firstWordTitle, secondWordTitle] = metadata.title
		.trim()
		.split(WORDS_REGEX)
		.slice(0, 2);

	return (
		<Card className="h-full px-6 py-5 md:py-6" pattern>
			<CardLink
				className="absolute top-5 right-5"
				label="Lire l'article !"
				url={`/projects/${slug}`}
			/>

			<div className="flex flex-col items-start justify-between gap-y-3">
				<h2
					className="inline-block font-bold font-pixelify-sans text-2xl text-theme md:text-3xl"
					title={metadata.title}
				>
					{firstWordTitle}
					<br />
					{secondWordTitle}
				</h2>
				<Paragraph className="relative line-clamp-3 leading-relaxed max-sm:line-clamp-2 max-md:line-clamp-4">
					{extractSentence(metadata.description)}.
				</Paragraph>
				<span className="text-muted-foreground text-sm">
					{formatDate(metadata.date)}
				</span>
			</div>

			<PortfolioMockup />
		</Card>
	);
});
