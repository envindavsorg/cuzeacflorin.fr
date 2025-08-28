'use client';

import { useAnimate } from 'motion/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import type { CvMetadata } from '@/app/api/cv/route';
import { MemojiToggle } from '@/components/elements/MemojiToggle';
import { ToggleAvatar } from '@/components/elements/ToggleAvatar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { Spinner } from '@/components/ui/Spinner';
import { Title } from '@/components/ui/Title';
import { fetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName, pronounce, experience, cv } = PROFILE_CONFIG;

export const AboutMe = memo((): React.JSX.Element => {
	const [avatar, setAvatar] = useState(0);
	const [pulseScope, animatePulse] = useAnimate<HTMLDivElement>();
	const isUserInteractionRef = useRef(false);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	const { resolvedTheme } = useTheme();
	const dynamicColor = resolvedTheme === 'dark' ? '#FCE24A' : '#E4620C';

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

	return (
		<Card
			className={cn(
				'h-full px-6 py-5 md:py-6 lg:px-8 lg:py-8',
				'lg:flex lg:flex-col lg:items-start lg:justify-between lg:gap-x-6',
				'grid grid-cols-1 content-between lg:grid-cols-4'
			)}
			pattern
		>
			<ToggleAvatar
				animatePulse={animatePulse}
				avatar={avatar}
				color={dynamicColor}
				isUserInteractionRef={isUserInteractionRef}
				pulseScope={pulseScope}
				setAvatar={setAvatar}
				setHasUserInteracted={setHasUserInteracted}
			/>

			<div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:gap-x-6">
				<MemojiToggle
					avatar={avatar}
					isUserInteraction={hasUserInteracted}
					pulseRef={pulseScope}
				/>
				<Title name={`${firstName} ${lastName}`} pronounce={pronounce} />
			</div>

			<Paragraph className="relative leading-relaxed">
				Développeur web avec{' '}
				<span className="font-bold">{experience.years} ans d'expérience</span>.
				Je crée des solutions web où technique et design se rencontrent.
			</Paragraph>

			<div className="flex items-center gap-x-6 md:gap-x-3 lg:gap-x-6">
				<Button asChild className="px-4" size="sm" variant="outline">
					<Link aria-label={cv.shareText} href={cv.filePath}>
						<span className="max-md:hidden">Découvrez</span>{' '}
						<span className="font-bold max-md:uppercase">mon CV</span>
					</Link>
				</Button>
				{showSpinner ? (
					<Spinner className="size-4 text-muted-foreground" variant="default" />
				) : data ? (
					<div className="flex gap-x-2">
						<span className="text-muted-foreground text-sm md:text-xs lg:text-sm">
							{data.sizeKB} KB
						</span>
						<span className="text-muted-foreground text-sm md:text-xs lg:text-sm">
							•
						</span>
						<span className="text-muted-foreground text-sm md:text-xs lg:text-sm">
							{data.lastModified}
						</span>
					</div>
				) : null}
			</div>
		</Card>
	);
});

AboutMe.displayName = 'AboutMe';
