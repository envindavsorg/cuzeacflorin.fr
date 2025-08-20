'use client';

import { LayoutGroup, motion, useAnimate } from 'motion/react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useRef, useState } from 'react';
import { Paragraph } from '@/components/text/Paragraph';
import { Title } from '@/components/text/Title';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { Pattern } from '@/components/ui/Pattern';
import { ToggleAvatar } from '@/components/widgets/bio/ToggleAvatar';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const {
	firstName,
	lastName,
	pronounce,
	welcome,
	image,
	titles,
	experience,
	avatars,
} = PROFILE_CONFIG;

type ProfileImageProps = {
	avatar: number;
	isUserInteraction: boolean;
	pulseRef: React.RefObject<HTMLDivElement>;
};

const ROTATION_ANGLE = 30;
const SCALE_SMALL = 0.4;
const EASE_CURVE = [0.85, 0, 0.3, 1] as const;
const ANIMATION_DURATION = 0.5;

const ProfileImage = memo(
	({
		avatar,
		isUserInteraction,
		pulseRef,
	}: ProfileImageProps): React.JSX.Element => {
		const MotionImage = motion.create(Image);

		return (
			<LayoutGroup>
				<div className="relative">
					<div className="relative size-12 overflow-hidden rounded-full sm:size-14">
						<MotionImage
							alt={image.alt}
							animate={
								isUserInteraction
									? {
											opacity: 1,
											scale: 1,
											rotate: 0,
										}
									: false
							}
							className="relative z-10 h-full rounded-full object-cover object-top grayscale-[0.35] filter"
							exit={
								isUserInteraction
									? {
											opacity: 0,
											scale: SCALE_SMALL,
											rotate: avatar === 0 ? ROTATION_ANGLE : -ROTATION_ANGLE,
										}
									: false
							}
							fill
							initial={
								isUserInteraction
									? {
											opacity: 0,
											scale: SCALE_SMALL,
											rotate: avatar === 0 ? -ROTATION_ANGLE : ROTATION_ANGLE,
										}
									: {
											opacity: 1,
											scale: 1,
											rotate: 0,
										}
							}
							key={avatar}
							priority
							sizes="(max-width: 768px) 48px, 56px"
							src={avatars[avatar]}
							transition={
								isUserInteraction
									? {
											ease: EASE_CURVE,
											duration: ANIMATION_DURATION,
										}
									: { duration: 0 }
							}
						/>
					</div>
					<div
						className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-8 rounded-full"
						ref={pulseRef}
					/>
				</div>
			</LayoutGroup>
		);
	}
);

ProfileImage.displayName = 'ProfileImage';

export const Description = memo((): React.JSX.Element => {
	const [avatar, setAvatar] = useState(0);
	const [pulseScope, animatePulse] = useAnimate<HTMLDivElement>();
	const { resolvedTheme } = useTheme();
	const isUserInteractionRef = useRef(false);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	const dynamicColor = resolvedTheme === 'dark' ? '#FCE24A' : '#E4620C';

	return (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl px-8 py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm max-md:bg-red-100'
			)}
		>
			<div className="flex items-center gap-x-4">
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

			<Paragraph className="leading-relaxed">
				Je suis{' '}
				<span className="font-bold font-pixelify-sans text-2xl text-theme">
					{lastName}
				</span>
				, développeur web avec{' '}
				<Counter
					className="font-bold font-pixelify-sans text-theme text-xl"
					value={experience.years}
				>
					ans d'expérience
				</Counter>
				. Je crée des solutions web innovantes où technique et design se
				rencontrent.
			</Paragraph>

			<div className="flex items-center gap-x-3">
				{titles.map(({ label, icon: Icon, uid }) => (
					<Badge key={uid} variant="outline">
						<div className="flex items-center gap-x-1.5">
							<Icon className="size-4 text-theme" weight="regular" />
							{label}
						</div>
					</Badge>
				))}
			</div>

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

Description.displayName = 'Description';
