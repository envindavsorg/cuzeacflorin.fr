import type { Metadata } from 'next';
import type { ProfilePage as PageSchema, WithContext } from 'schema-dts';
import { Divider } from '@/components/ui/Divider';
import { getGitHubUserData } from '@/features/root/actions/github.action';
import { getLinkedInFollowers } from '@/features/root/actions/linkedin.action';
import { USER } from '@/features/root/data/user';
import { About } from '@/features/root/profile/About';
import { Blog } from '@/features/root/profile/Blog';
import { Certs } from '@/features/root/profile/Certs';
import { Commits } from '@/features/root/profile/Commits';
import { Contact } from '@/features/root/profile/Contact';
import { Cover } from '@/features/root/profile/Cover';
import { CoverStatic } from '@/features/root/profile/CoverStatic';
import { CV } from '@/features/root/profile/CV';
import { Experiences } from '@/features/root/profile/Experience';
import { Header } from '@/features/root/profile/Header';
import { Overview } from '@/features/root/profile/Overview';
import { Projects } from '@/features/root/profile/Projects';
import { TechStack } from '@/features/root/profile/TechStack';
import { Utils } from '@/features/root/profile/Utils';
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
