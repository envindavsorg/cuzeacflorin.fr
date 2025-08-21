'use client';

import { ReadCvLogoIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { cv } = PROFILE_CONFIG;

export const CvWidget = memo((): React.JSX.Element => {
	return (
		<Card
			className={cn(
				'relative items-center justify-center rounded-3xl md:p-4 lg:p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<Link
				aria-label={cv.shareText}
				className="flex flex-col items-center justify-center gap-y-4"
				href={cv.filePath}
			>
				<div className="flex items-center justify-center p-2">
					<ReadCvLogoIcon className="size-10 text-theme lg:size-18" />
				</div>
				<div className="flex flex-col items-center justify-center gap-y-2">
					<h3 className="font-bold font-pixelify-sans text-3xl text-theme">
						Mon CV
					</h3>
					<p className="text-center text-muted-foreground text-sm max-lg:hidden">
						visualiser ou télécharger
					</p>
				</div>
			</Link>

			<Pattern />
		</Card>
	);
});
