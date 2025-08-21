'use client';

import { useAnimate } from 'motion/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useRef, useState } from 'react';
import { Paragraph } from '@/components/text/Paragraph';
import { Title } from '@/components/text/Title';
import { Card } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { Pattern } from '@/components/ui/Pattern';
import { ProfileImage } from '@/components/widgets/bio/ProfileImage';
import { ToggleAvatar } from '@/components/widgets/bio/ToggleAvatar';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName, pronounce, welcome, experience } = PROFILE_CONFIG;

export const BioWidget = memo((): React.JSX.Element => {
	const [avatar, setAvatar] = useState(0);
	const [pulseScope, animatePulse] = useAnimate<HTMLDivElement>();
	const { resolvedTheme } = useTheme();
	const isUserInteractionRef = useRef(false);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	const dynamicColor = resolvedTheme === 'dark' ? '#FCE24A' : '#E4620C';

	return (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl px-8 lg:py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:gap-x-6">
				<ProfileImage
					avatar={avatar}
					isUserInteraction={hasUserInteracted}
					pulseRef={pulseScope}
				/>
				<Title
					name={`${firstName} ${lastName}`}
					pronounce={pronounce}
					title={welcome}
				/>
			</div>

			<Paragraph className="relative leading-relaxed">
				Je suis{' '}
				<span className="font-bold font-pixelify-sans text-theme text-xl md:text-2xl">
					{lastName}
				</span>
				, développeur web avec{' '}
				<Counter
					className="font-bold font-pixelify-sans text-lg text-theme md:text-xl"
					value={experience.years}
				>
					ans d'expérience
				</Counter>
				. Je crée des solutions web innovantes où technique et design se
				rencontrent.
			</Paragraph>

			<ToggleAvatar
				animatePulse={animatePulse}
				avatar={avatar}
				color={dynamicColor}
				isUserInteractionRef={isUserInteractionRef}
				pulseScope={pulseScope}
				setAvatar={setAvatar}
				setHasUserInteracted={setHasUserInteracted}
			/>

			<Pattern />
		</Card>
	);
});

BioWidget.displayName = 'BioWidget';
