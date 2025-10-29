import type { Metadata } from 'next';
import type { ProfilePage as PageSchema, WithContext } from 'schema-dts';
import { getGitHubUserData } from '@/components/features/root/actions/github.action';
import { getLinkedInFollowers } from '@/components/features/root/actions/linkedin.action';
import { USER } from '@/components/features/root/data/user';
import { About } from '@/components/features/root/elements/about/About';
import { Blog } from '@/components/features/root/elements/Blog';
import { Certs } from '@/components/features/root/elements/Certs';
import { Commits } from '@/components/features/root/elements/commits/Commits';
import { Contact } from '@/components/features/root/elements/contact/Contact';
import { Cover } from '@/components/features/root/elements/cover/Cover';
import { CV } from '@/components/features/root/elements/cv/CV';
import { Experiences } from '@/components/features/root/elements/Experience';
import { Header } from '@/components/features/root/elements/header/Header';
import { Overview } from '@/components/features/root/elements/overview/Overview';
import { Projects } from '@/components/features/root/elements/Projects';
import { TechStack } from '@/components/features/root/elements/stack/TechStack';
import { Utils } from '@/components/features/root/elements/Utils';
import { Divider } from '@/components/ui/Divider';
import { dayjs } from '@/lib/dayjs';
import { generateOgMetadata } from '@/lib/og-image';

export const generateMetadata = async (): Promise<Metadata> =>
	generateOgMetadata({
		title: `${USER.firstName} ${USER.lastName}`,
		description: USER.bio,
		ogImageParams: {
			type: 'homepage',
			title: `${USER.firstName} ${USER.lastName}`,
			description: USER.bio,
		},
	});

const getPageJsonLd = (): WithContext<PageSchema> => ({
	'@context': 'https://schema.org',
	'@type': 'ProfilePage',
	dateCreated: dayjs(USER.dateCreated).toISOString(),
	dateModified: dayjs().toISOString(),
	mainEntity: {
		'@type': 'Person',
		name: USER.displayName,
		identifier: USER.username,
		image: USER.avatar,
	},
});

const Page = async () => {
	const [github, linkedin] = await Promise.all([
		getGitHubUserData().then((data) => data.followers),
		getLinkedInFollowers().then((data) => data.count),
	]);

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(getPageJsonLd()).replace(/</g, '\\u003c'),
				}}
				type="application/ld+json"
			/>

			<div className="mx-auto md:max-w-3xl">
				<Cover />
				<Header />
				<Divider />
				<Overview />
				<Divider />
				<CV />
				<Divider />
				<Contact githubFollowers={github} linkedinFollowers={linkedin} />
				<Divider />
				<About />
				<Divider />
				<Commits />
				<Divider />
				<TechStack />
				<Divider />
				<Blog />
				<Divider />
				<Certs />
				<Divider />
				<Utils />
				<Divider />
				<Experiences />
				<Divider />
				<CV />
				<Divider />
				<Projects />
				<Divider />
			</div>
		</>
	);
};

export default Page;
