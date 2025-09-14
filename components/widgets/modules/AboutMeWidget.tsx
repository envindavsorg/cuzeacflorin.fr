'use client';

import { ArrowRightIcon, ReadCvLogoIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import useSWR from 'swr';
import type { CvMetadata } from '@/app/api/cv/route';
import { defaultVariantsNoDelay } from '@/components/animation/motion/motion.variants';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { Spinner } from '@/components/ui/Spinner';
import { date } from '@/lib/dayjs';
import { fetcher } from '@/lib/fetcher';
import { PROFILE_CONFIG } from '@/resources/profile';

const { cv } = PROFILE_CONFIG;

export const AboutMeWidget = memo((): React.JSX.Element => {
	const [shouldFetch, setShouldFetch] = useState(false);
	const [showSpinner, setShowSpinner] = useState(true);

	useEffect(() => {
		const fetchTimer = setTimeout(() => setShouldFetch(true), 100);
		const spinnerTimer = setTimeout(() => setShowSpinner(false), 2000);

		return () => {
			clearTimeout(fetchTimer);
			clearTimeout(spinnerTimer);
		};
	}, []);

	const { data } = useSWR<CvMetadata>(shouldFetch ? '/api/cv' : null, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const MotionCard = motion.create(Card);

	return (
		<Link aria-label={cv.shareText} href={cv.filePath}>
			<MotionCard
				className="flex h-full flex-col justify-center p-4"
				variants={defaultVariantsNoDelay}
			>
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-base tracking-tight group-hover:text-theme sm:text-lg">
						Mon nouveau CV
					</h3>
					<span className="inset-shadow-2xs inset-shadow-white/25 whitespace-nowrap rounded-[3px] border-[1px] border-primary/10 bg-linear-to-b from-primary/5 to-muted/40 px-1 py-[1px] text-primary text-xs">
						Nouveau
					</span>
				</div>

				<Paragraph className="!text-xs sm:!text-sm mt-2 line-clamp-3 text-muted-foreground sm:mt-3">
					Patch notes : mon CV a fait sa nouvelle mise à jour (comme ton iPhone,
					mais en plus utile, et sans Liquid Glass).
				</Paragraph>

				<div className="mt-2 flex-1">
					{showSpinner && (
						<div className="flex items-center gap-x-1.5 py-1">
							<Spinner
								className="size-4 text-muted-foreground"
								variant="default"
							/>
							<span className="text-muted-foreground text-xs italic">
								chargement des meta-données
							</span>
						</div>
					)}
					{!showSpinner && data && (
						<div className="flex flex-wrap gap-1.5">
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{data.sizeKB} KB
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								fichier pdf
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								<span className="inline-block lg:hidden xl:inline-block">
									modifié le
								</span>{' '}
								{date(data.lastModified).format('ddd DD MMM YYYY')}
							</div>
						</div>
					)}
				</div>

				<div className="mt-3 flex items-center justify-between gap-3">
					<ReadCvLogoIcon className="size-5 shrink-0" />
					<div className="flex items-center gap-x-1 *:text-muted-foreground">
						<span className="text-xs group-hover:text-theme sm:text-sm">
							Voir et télécharger
						</span>
						<ArrowRightIcon className="group-hover:-rotate-45 text-sm transition duration-200 group-hover:text-theme sm:text-base" />
					</div>
				</div>
			</MotionCard>
		</Link>
	);
});
