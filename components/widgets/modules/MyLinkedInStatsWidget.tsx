'use client';

import { ArrowRightIcon, UsersIcon } from '@phosphor-icons/react';
import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { memo } from 'react';
import { defaultVariantsNoDelay } from '@/components/animation/motion/motion.variants';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { linkedin } = PROFILE_CONFIG;

type MyLinkedInStatsWidgetProps = {
	followers: number;
};

export const MyLinkedInStatsWidget = memo(
	({ followers }: MyLinkedInStatsWidgetProps): React.JSX.Element => {
		const MotionLink = motion.create(Link);

		return (
			<MotionLink
				aria-label="Lire l'article !"
				href={linkedin.url}
				layoutId="my-linkedin-stats"
				variants={defaultVariantsNoDelay}
				whileHover={{ scale: 1.025 }}
			>
				<Card className="flex h-full flex-col justify-center p-4">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-base tracking-tight group-hover:text-theme sm:text-lg">
							Mes statistiques LinkedIn
						</h3>
						<span
							className={cn(
								'whitespace-nowrap rounded-[3px] px-1 py-[1px]',
								'bg-linear-to-b from-primary/5 to-muted/40 text-xs',
								'inset-shadow-2xs inset-shadow-white/25',
								'border-[1px] border-theme/10 group-hover:border-primary/10',
								'text-theme group-hover:text-primary'
							)}
						>
							WeFix
						</span>
					</div>

					<Paragraph className="!text-xs sm:!text-sm mt-2 line-clamp-3 text-muted-foreground sm:mt-3">
						Je partage régulièrement des articles techniques et des nouvelles de
						l'industrie sur mon profil LinkedIn.
					</Paragraph>

					<div className="mt-2 flex-1">
						<div className="flex flex-wrap gap-1.5">
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{followers} abonnés
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{linkedin.handle}
							</div>
						</div>
					</div>

					<div className="mt-3 flex items-center justify-between gap-3">
						<div className="flex items-center gap-x-3">
							<LinkedinLogoIcon className="size-4 shrink-0" />
							<UsersIcon className="size-4 shrink-0" />
						</div>
						<div className="flex items-center gap-x-1 *:text-muted-foreground">
							<span className="text-xs group-hover:text-theme sm:text-sm">
								Voir mon profil
							</span>
							<ArrowRightIcon className="group-hover:-rotate-45 text-sm transition duration-200 group-hover:text-theme sm:text-base" />
						</div>
					</div>
				</Card>
			</MotionLink>
		);
	}
);
