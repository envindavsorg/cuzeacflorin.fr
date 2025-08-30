import type React from 'react';
import { memo } from 'react';
import { PortfolioMockup } from '@/components/elements/PortfolioMockup';
import { Card, CardLink } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { date } from '@/lib/dayjs';
import { getFirstProject } from '@/lib/projects';
import { WHITESPACE_SEPARATOR } from '@/lib/regex';

export const PortfolioJourney = memo((): React.JSX.Element => {
	const { metadata, slug } = getFirstProject();
	const [firstWordTitle, secondWordTitle] = metadata.title
		.trim()
		.split(WHITESPACE_SEPARATOR)
		.slice(0, 2);

	return (
		<Card className="h-full px-6 py-5 md:py-6">
			<CardLink
				className="absolute top-5 right-5"
				label="Lire l'article !"
				url={`/projects/${slug}`}
			/>

			<div className="flex flex-col items-start justify-between gap-y-3">
				<h2
					className="inline-block font-bold font-pixelify-sans text-3xl text-theme"
					title={metadata.title}
				>
					{firstWordTitle}
					<br />
					{secondWordTitle}
				</h2>
				<Paragraph className="relative line-clamp-3 leading-relaxed max-sm:line-clamp-2 max-md:line-clamp-4">
					{metadata.description}
				</Paragraph>
				<span className="text-muted-foreground text-sm max-md:hidden">
					{date(metadata.date).format('ddd DD MMM YYYY')}
				</span>
			</div>

			<PortfolioMockup />
		</Card>
	);
});
