'use client';

import { ArrowRightIcon } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { memo } from 'react';
import type { MDXData, PostMetadata } from '@/blog/mdx';
import { defaultVariantsNoDelay } from '@/components/animation/motion/motion.variants';
import { NextJSIcon } from '@/components/icons/content/Next';
import { ReactIcon } from '@/components/icons/content/React';
import { TailwindIcon } from '@/components/icons/content/Tailwind';
import { TypeScriptIcon } from '@/components/icons/content/TypeScript';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { date } from '@/lib/dayjs';
import { cn } from '@/lib/utils';

type PortfolioCreationWidgetProps = {
	project: MDXData<PostMetadata>;
};

export const PortfolioCreationWidget = memo(
	({ project }: PortfolioCreationWidgetProps): React.JSX.Element => {
		const { metadata, slug, reading } = project;

		const MotionLink = motion.create(Link);

		return (
			<MotionLink
				aria-label="Lire l'article !"
				href={`/projects/${slug}`}
				layoutId="my-journey-widget"
				variants={defaultVariantsNoDelay}
				whileHover={{ scale: 1.025 }}
			>
				<Card className="flex h-full flex-col justify-center p-4">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-base tracking-tight group-hover:text-theme sm:text-lg">
							{metadata.title}
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
							{dayjs().to(dayjs(metadata.date))}
						</span>
					</div>

					<Paragraph className="!text-xs sm:!text-sm mt-2 line-clamp-3 text-muted-foreground sm:mt-3">
						{metadata.description}
					</Paragraph>

					<div className="mt-2 flex-1">
						<div className="flex flex-wrap gap-1.5">
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{date(metadata.date).format('ddd DD MMM YYYY')}
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{reading?.time}
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{reading?.words} mots
							</div>
						</div>
					</div>

					<div className="mt-3 flex items-center justify-between gap-3">
						<div className="flex items-center gap-x-3">
							<ReactIcon className="size-4 shrink-0" />
							<NextJSIcon className="size-4 shrink-0" />
							<TypeScriptIcon className="size-4 shrink-0" />
							<TailwindIcon className="size-4 shrink-0" />
						</div>
						<div className="flex items-center gap-x-1 *:text-muted-foreground">
							<span className="text-xs group-hover:text-theme sm:text-sm">
								Lire l'article
							</span>
							<ArrowRightIcon className="group-hover:-rotate-45 text-sm transition duration-200 group-hover:text-theme sm:text-base" />
						</div>
					</div>
				</Card>
			</MotionLink>
		);
	}
);
