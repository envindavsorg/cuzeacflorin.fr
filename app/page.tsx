import type { Metadata } from 'next';
import Script from 'next/script';
import type React from 'react';
import { lazy, Suspense, useId } from 'react';
import { Bento } from '@/components/blocs/Bento';
import { BentoItem } from '@/components/blocs/BentoItem';
import { gridItems, layouts } from '@/lib/grid';
import { generateOgMetadata } from '@/lib/image';
import { defaultDescription } from '@/resources/meta';
import { PROFILE_CONFIG } from '@/resources/profile';

const Noise = lazy(() =>
	import('@/components/animation/Noise').then((module) => ({
		default: module.Noise,
	}))
);

const { firstName, lastName, welcome } = PROFILE_CONFIG;

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
			<Script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
				id={structuredDataId}
				strategy="afterInteractive"
				type="application/ld+json"
			/>

			<Suspense fallback={null}>
				<Noise />
			</Suspense>

			<h1 className="hidden">
				{firstName} {lastName}
			</h1>

			<main className="pb-15">
				<Bento layouts={layouts}>
					{gridItems.map((item) => (
						<BentoItem component={item.component} id={item.i} key={item.i} />
					))}
				</Bento>
			</main>
		</>
	);
};

export default Home;
