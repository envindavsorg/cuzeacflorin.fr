import type { Metadata } from 'next';
import Script from 'next/script';
import type React from 'react';
import { Fragment, useId } from 'react';
import { Bento } from '@/components/blocs/Bento';
import { BentoItem } from '@/components/blocs/BentoItem';
import { Container } from '@/components/ui/Container';
import { gridItems, layouts } from '@/lib/grid';
import { generateOgMetadata } from '@/lib/image';
import { defaultDescription } from '@/resources/meta';
import { PROFILE_CONFIG } from '@/resources/profile';

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
	// const controls = useAnimation();
	// //const [filter, setFilter] = useState<FilterType>('all');
	//
	// useEffect(() => {
	// 	controls.set({
	// 		y: 15,
	// 		opacity: 0,
	// 	});
	//
	// 	controls.start({
	// 		y: 0,
	// 		opacity: 1,
	// 		transition: {
	// 			duration: 0.5,
	// 			ease: 'easeInOut',
	// 		},
	// 	});
	// }, [controls]);

	const structuredDataId: string = useId();

	return (
		<Fragment>
			<Script
				id={structuredDataId}
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			<Container
				as="header"
				className="flex items-center justify-between py-0"
			>
				<h1 className="hidden">
					{firstName} {lastName}
				</h1>
			</Container>

			<main className="mx-auto w-full max-w-7xl px-8 pt-0 pb-24 max-lg:px-4">
				<Bento layouts={layouts}>
					{gridItems.map((item) => (
						<BentoItem
							key={item.i}
							id={item.i}
							component={item.component}
						/>
					))}
				</Bento>
			</main>
		</Fragment>
	);
};

export default Home;
