'use client';

import { useAnimate } from 'motion/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useRef, useState } from 'react';
import { MemojiToggle } from '@/components/elements/MemojiToggle';
import { ToggleAvatar } from '@/components/elements/ToggleAvatar';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { PROFILE_CONFIG } from '@/resources/profile';

const { experience } = PROFILE_CONFIG;

export const AboutMe = memo((): React.JSX.Element => {
	const [avatar, setAvatar] = useState(0);
	const [pulseScope, animatePulse] = useAnimate<HTMLDivElement>();
	const isUserInteractionRef = useRef(false);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);
	const { resolvedTheme } = useTheme();
	const dynamicColor = resolvedTheme === 'dark' ? '#FCE24A' : '#E4620C';

	return (
		<Card className="flex h-full flex-col justify-center px-6 py-3">
			<ToggleAvatar
				animatePulse={animatePulse}
				avatar={avatar}
				color={dynamicColor}
				isUserInteractionRef={isUserInteractionRef}
				pulseScope={pulseScope}
				setAvatar={setAvatar}
				setHasUserInteracted={setHasUserInteracted}
			/>

			<div className="flex flex-col items-start justify-between gap-y-3">
				<MemojiToggle
					avatar={avatar}
					isUserInteraction={hasUserInteracted}
					pulseRef={pulseScope}
				/>
				<Paragraph>
					Bonjour et bienvenue, je m'appelle{' '}
					<span className="font-archivo-black text-2xl text-theme">
						{PROFILE_CONFIG.lastName}
					</span>
					.
				</Paragraph>
				<Paragraph className="text-balance">
					Développeur web avec{' '}
					<span className="font-bold">{experience.years} ans d'expérience</span>
					. Je crée des solutions web où technique et design se rencontrent.
				</Paragraph>
			</div>
		</Card>
	);
});
