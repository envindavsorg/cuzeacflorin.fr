import type { ProfilePage as PageSchema, WithContext } from 'schema-dts';
import { Divider } from '@/components/ui/Divider';
import { getGitHubUserData } from '@/features/root/actions/github.action';
import { getLinkedInFollowers } from '@/features/root/actions/linkedin.action';
import { USER } from '@/features/root/data/user';
import { Blog } from '@/features/root/elements/Blog';
import { Certifications } from '@/features/root/elements/certifications';
import { Experiences } from '@/features/root/elements/experiences';
import { GitHubContributions } from '@/features/root/elements/github-contributions';
import { ProfileAbout } from '@/features/root/elements/ProfileAbout';
import { ProfileCover } from '@/features/root/elements/ProfileCover';
import { ProfileCoverStatic } from '@/features/root/elements/ProfileCoverStatic';
import { ProfileHeader } from '@/features/root/elements/ProfileHeader';
import { ProfileOverview } from '@/features/root/elements/ProfileOverview';
import { Projects } from '@/features/root/elements/projects';
import { SocialLinks } from '@/features/root/elements/social-links';
import { TechStack } from '@/features/root/elements/TechStack';
import { Utils } from '@/features/root/elements/Utils';
import { dayjs } from '@/lib/dayjs';

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
				{process.env.ENV_TYPE === 'capture' ? (
					<ProfileCoverStatic />
				) : (
					<ProfileCover />
				)}
				<ProfileHeader />
				<Divider />
				<ProfileOverview />
				<Divider />
				<SocialLinks githubFollowers={github} linkedinFollowers={linkedin} />
				<Divider />
				<ProfileAbout />
				<Divider />
				<GitHubContributions />
				<Divider />
				<TechStack />
				<Divider />
				<Certifications />
				<Divider />
				<Blog />
				<Divider />
				<Utils />
				<Divider />
				<Experiences />
				<Divider />
				<Projects />
				<Divider />
			</div>
		</>
	);
};

export default Page;
