import { ArrowDownIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ProfilePage as PageSchema, WithContext } from 'schema-dts';
import { getI18nInstance } from '@/app/appRouterI18n';
import { Divider } from '@/components/ui/Divider';
import { Panel, PanelHeader, PanelTitle } from '@/components/ui/Panel';
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

type PageProps = {
	params: Promise<{ lang: string }>;
};

const Page = async ({ params }: PageProps) => {
	const { lang } = await params;
	const i18n = getI18nInstance(lang);

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
				<Panel>
					<Link href="/cv/resume.pdf" rel="noopener noreferrer" target="_blank">
						<PanelHeader className="group flex items-center justify-center gap-x-3 p-4">
							<ArrowDownIcon
								className="size-6 text-theme transition-transform duration-500 ease-in-out group-hover:rotate-180"
								weight="duotone"
							/>
							<PanelTitle className="!text-xl">
								{i18n._({
									id: 'homepage.cv.download',
									message: 'View and download my resume',
								})}
							</PanelTitle>
						</PanelHeader>
					</Link>
				</Panel>
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
