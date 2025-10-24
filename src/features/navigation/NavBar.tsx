import { GithubLogoIcon, RssIcon } from '@phosphor-icons/react/ssr';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type React from 'react';
import { getAllPosts } from '@/blog/data/posts';
import type { Post } from '@/blog/types/post';
import { Button } from '@/components/Button';
import { MAIN_NAV, SOURCE_CODE_GITHUB_URL } from '@/config/site';
import { cn } from '@/lib/utils';
import { DesktopNav } from './navbar/DesktopNav';
import { SiteHeaderMark } from './navbar/SiteHeaderMark';
import { SiteHeaderWrapper } from './navbar/SiteHeaderWrapper';
import { ToggleTheme } from './navbar/ToggleTheme';

const CommandMenu = dynamic(() =>
	import('./navbar/CommandMenu').then((mod) => mod.CommandMenu)
);

const MobileNav = dynamic(() =>
	import('./navbar/MobileNav').then((mod) => mod.MobileNav)
);

export const NavBar = (): React.JSX.Element => {
	const posts: Post[] = getAllPosts();

	return (
		<SiteHeaderWrapper
			className={cn(
				'sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2',
				'data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]/80',
				'not-dark:data-[affix=true]:**:data-header-container:after:bg-border',
				'transition-shadow duration-300'
			)}
		>
			<div
				className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-edge border-x px-2 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl"
				data-header-container
			>
				<Link aria-label="Home" className="w-fit [&_svg]:h-8" href="/">
					<SiteHeaderMark />
				</Link>

				<div className="flex-1" />

				<DesktopNav items={MAIN_NAV} />

				<div className="flex items-center gap-2">
					<CommandMenu posts={posts} />

					<Button
						asChild
						className="border dark:inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/15 dark:border-0"
						size="icon"
						variant="outline"
					>
						<Link href={SOURCE_CODE_GITHUB_URL} rel="noopener" target="_blank">
							<GithubLogoIcon className="size-5" />
							<span className="sr-only">GitHub</span>
						</Link>
					</Button>

					<ToggleTheme />

					<Button
						asChild
						className="border dark:inset-shadow-[1px_1px_1px,0px_0px_2px] dark:inset-shadow-white/15 dark:border-0"
						size="icon"
						variant="outline"
					>
						<Link
							aria-label="Flux RSS"
							href="/rss"
							rel="noopener noreferrer"
							target="_blank"
						>
							<RssIcon className="size-5" />
							<span className="sr-only">GitHub</span>
						</Link>
					</Button>

					<MobileNav className="sm:hidden" items={MAIN_NAV} />
				</div>
			</div>
		</SiteHeaderWrapper>
	);
};
