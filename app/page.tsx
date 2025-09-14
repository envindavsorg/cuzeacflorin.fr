import type { Metadata } from 'next';
import Script from 'next/script';
import type React from 'react';
import { useId } from 'react';
import { Counter } from '@/components/ui/Counter';
import { Paragraph } from '@/components/ui/Paragraph';
import { WidgetGrid } from '@/components/widgets/Grid';
import { WidgetItem } from '@/components/widgets/Item';
import { AboutMeWidget } from '@/components/widgets/modules/AboutMeWidget';
import { generateOgMetadata } from '@/lib/image';
import { defaultDescription } from '@/resources/meta';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName, welcome, experience } = PROFILE_CONFIG;

export const generateMetadata = async (): Promise<Metadata> =>
	generateOgMetadata({
		title: `Portfolio - ${firstName} ${lastName}`,
		description: defaultDescription,
		ogImageParams: {
			type: 'homepage',
			title: `${firstName} ${lastName}`,
			subtitle: welcome,
		},
	});

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: `${firstName} ${lastName}`,
	workJobTitle: welcome,
	description: defaultDescription,
	worksFor: {
		'@type': 'Organization',
		name: 'WeFix',
	},
	knowsAbout: [
		'Développement web',
		'React',
		'Next.js',
		'UX/UI Design',
		'JavaScript',
		'TypeScript',
	],
};

const Home = (): React.JSX.Element => {
	const structuredDataId: string = useId();

	return (
		<>
			<Paragraph className="text-left">
				<span className="md:!text-xl !text-base bg-gradient-to-t from-gray-900 to-gray-900/90 bg-clip-text font-normal text-transparent tracking-tight dark:from-gray-100 dark:to-gray-100/90">
					Développeur web avec{' '}
					<Counter
						className="text-theme tabular-nums"
						interval={10}
						step={10}
						value={experience.years}
					>
						ans d'expérience
					</Counter>
					.
				</span>
				<span className="block" />
				<span className="md:!text-xl !text-base bg-gradient-to-t from-muted-foreground to-muted-foreground/80 bg-clip-text font-normal text-transparent tracking-tight dark:from-muted-foreground dark:to-muted-foreground/70">
					Je crée des solutions web où <br className="min-sm:hidden" />
					technique et design se rencontrent.
				</span>
			</Paragraph>

			<WidgetGrid className="mt-6">
				<WidgetItem>
					<AboutMeWidget />
				</WidgetItem>
			</WidgetGrid>

			<Script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
				id={structuredDataId}
				strategy="afterInteractive"
				type="application/ld+json"
			/>
		</>
	);
};

export default Home;
