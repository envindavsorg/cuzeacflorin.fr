import type { Metadata } from 'next';
import type { ProfilePage as PageSchema, WithContext } from 'schema-dts';
import { Divider } from '@/components/Divider';
import { getGitHubUserData } from '@/features/root/actions/github.action';
import { getLinkedInFollowers } from '@/features/root/actions/linkedin.action';
import { USER } from '@/features/root/data/user';
import { About } from '@/features/root/elements/About';
import { Blog } from '@/features/root/elements/Blog';
import { Certs } from '@/features/root/elements/Certs';
import { Commits } from '@/features/root/elements/Commits';
import { Contact } from '@/features/root/elements/Contact';
import { Cover } from '@/features/root/elements/Cover';
import { CoverStatic } from '@/features/root/elements/CoverStatic';
import { CV } from '@/features/root/elements/CV';
import { Experiences } from '@/features/root/elements/Experience';
import { Header } from '@/features/root/elements/Header';
import { Overview } from '@/features/root/elements/Overview';
import { Projects } from '@/features/root/elements/Projects';
import { TechStack } from '@/features/root/elements/TechStack';
import { Utils } from '@/features/root/elements/Utils';
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
				{process.env.ENV_TYPE === 'capture' ? <CoverStatic /> : <Cover />}
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
