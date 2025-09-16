'use client';

import {
	ArrowRightIcon,
	DownloadIcon,
	ReadCvLogoIcon,
} from '@phosphor-icons/react';
import type React from 'react';
import { memo } from 'react';
import useSWR from 'swr';
import type { CvMetadata } from '@/app/api/cv/route';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { Spinner } from '@/components/ui/Spinner';
import { GridItem } from '@/components/widgets/GridItem';
import { date } from '@/lib/dayjs';
import { fetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { cv } = PROFILE_CONFIG;

export const AboutMe = memo((): React.JSX.Element => {
	const { data, isLoading } = useSWR<CvMetadata>('/api/cv', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		keepPreviousData: true,
	});

	return (
		<GridItem aria={cv.shareText} link={cv.filePath} slug="about-me-widget">
			<Card className="flex h-full flex-col justify-center p-4">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-base tracking-tight group-hover:text-theme sm:text-lg">
						Mon nouveau CV
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
						Nouveau
					</span>
				</div>

				<Paragraph className="!text-xs sm:!text-sm mt-2 line-clamp-3 text-muted-foreground sm:mt-3">
					Patch notes : mon CV a fait sa nouvelle mise à jour (comme ton iPhone,
					mais en plus utile)
				</Paragraph>

				<div className="mt-2 flex-1">
					{isLoading && (
						<div className="flex items-center gap-x-1.5 py-1">
							<Spinner
								className="size-4 text-muted-foreground"
								variant="default"
							/>
							<span className="text-muted-foreground text-xs italic">
								chargement ...
							</span>
						</div>
					)}
					{data && (
						<div className="flex flex-wrap gap-1.5">
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{data.sizeKB} KB
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								fichier pdf
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{date(data.lastModified).format('ddd DD MMM YYYY')}
							</div>
						</div>
					)}
				</div>

				<div className="mt-3 flex items-center justify-between gap-3">
					<div className="flex items-center gap-x-3">
						<ReadCvLogoIcon className="size-5 shrink-0" />
						<ArrowRightIcon className="size-3 shrink-0 text-muted-foreground" />
						<DownloadIcon className="size-5 shrink-0" />
					</div>
					<div className="flex items-center gap-x-1 *:text-muted-foreground">
						<span className="text-xs group-hover:text-theme sm:text-sm">
							Voir et télécharger
						</span>
						<ArrowRightIcon className="group-hover:-rotate-45 text-sm transition duration-200 group-hover:text-theme sm:text-base" />
					</div>
				</div>
			</Card>
		</GridItem>
	);
});
