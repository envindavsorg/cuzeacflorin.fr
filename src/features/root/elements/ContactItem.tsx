import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { Counter } from '@/components/ux/Counter';
import type { SocialLinksProps } from '@/features/root/data/social-links';
import { cn } from '@/lib/utils';

export type FollowerCounts = {
	githubFollowers: number;
	linkedinFollowers: number;
};

type ContactItemProps = SocialLinksProps & FollowerCounts;

const FOLLOWER_CONFIG = {
	GitHub: { step: 10, label: 'abonnés', key: 'githubFollowers' },
	LinkedIn: { step: 1000, label: 'abonnés', key: 'linkedinFollowers' },
} as const;

export const ContactItem = ({
	icon,
	title,
	description,
	handle,
	href,
	githubFollowers,
	linkedinFollowers,
}: ContactItemProps): React.JSX.Element => {
	const followerData = { githubFollowers, linkedinFollowers };
	const config = FOLLOWER_CONFIG[title as keyof typeof FOLLOWER_CONFIG];
	const followerCount = config
		? followerData[config.key as keyof typeof followerData]
		: 0;

	return (
		<Link
			aria-label={description}
			className={cn(
				'group/link flex cursor-pointer select-none items-center gap-x-3 rounded-2xl p-4 transition-colors',
				'max-sm:screen-line-before max-sm:screen-line-after',
				'sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after'
			)}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			<Image
				alt={title}
				className="shrink-0"
				height={42}
				quality={100}
				src={icon}
				unoptimized
				width={42}
			/>

			<div className="flex-1">
				<h3 className="font-medium text-sm sm:text-base">{title}</h3>

				<p className="text-muted-foreground text-xs sm:text-sm">
					{handle}
					{config && (
						<>
							{' '}
							-{' '}
							<span className="font-medium text-theme">
								{process.env.ENV_TYPE === 'capture' ? (
									followerCount
								) : (
									<Counter step={config.step} value={followerCount} />
								)}{' '}
								{config.label}
							</span>
						</>
					)}
				</p>
			</div>

			<ArrowUpRightIcon
				className="size-5 text-muted-foreground transition-transform duration-300 group-hover/link:rotate-45"
				weight="duotone"
			/>
		</Link>
	);
};
