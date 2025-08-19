'use client';

import { ArrowsCounterClockwiseIcon } from '@phosphor-icons/react';
import { LayoutGroup, motion, useAnimation } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useId, useState } from 'react';
import { Paragraph } from '@/components/text/Paragraph';
import { Title } from '@/components/text/Title';
import { Badge } from '@/components/ui/Badge';
import { Beam } from '@/components/ui/Beam';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { Pattern } from '@/components/ui/Pattern';
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
	work,
	avatars,
} = PROFILE_CONFIG;

interface ProfileImageProps {
	avatar: number;
	controls: any;
}

const ProfileImage = memo(
	({ avatar, controls }: ProfileImageProps): React.JSX.Element => {
		const imageId: string = useId();
		const MotionImage = motion.create(Image);

		return (
			<LayoutGroup>
				<div className="relative">
					<div className="relative size-12 overflow-hidden rounded-full sm:size-14">
						<MotionImage
							key={imageId}
							src={avatars[avatar]}
							alt={image.alt}
							className="relative z-10 h-full rounded-full object-cover object-top grayscale-[0.35] filter"
							fill
							sizes="(max-width: 768px) 48px, 56px"
							priority
							initial={{
								opacity: 0,
								scale: 0.4,
								rotate: avatar === 0 ? -30 : 30,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								rotate: 0,
							}}
							exit={{
								opacity: 0,
								scale: 0.4,
								rotate: avatar === 0 ? 30 : -30,
							}}
							transition={{
								ease: [0.85, 0, 0.3, 1],
								duration: 0.5,
							}}
						/>
					</div>
					<motion.div
						className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-8 rounded-full"
						animate={controls}
					/>
				</div>
			</LayoutGroup>
		);
	},
);

ProfileImage.displayName = 'ProfileImage';

interface WorkTextProps {
	active: boolean;
}

const WorkText = memo(
	({ active }: WorkTextProps): React.JSX.Element => (
		<span
			className={cn(
				'absolute top-full block transition-all duration-1000 ease-slow',
				'h-full duration-200',
				{ '-translate-y-full': active },
			)}
		>
			<Paragraph className="leading-relaxed">
				Depuis{' '}
				<Counter
					className="font-bold font-pixelify-sans text-theme text-xl"
					value={work.experience.years}
				>
					ans
				</Counter>
				, je travaille chez{' '}
				<Link
					href={work.url}
					aria-label={work.company}
					target="_blank"
					rel="noopener noreferrer"
					className="font-bold font-pixelify-sans text-2xl text-theme"
					prefetch={false}
				>
					{work.company}
				</Link>
				, leader de la réparation en France, où je développe des
				solutions web innovantes.
			</Paragraph>
		</span>
	),
);

WorkText.displayName = 'WorkText';

export const Description = memo((): React.JSX.Element => {
	const [avatar, setAvatar] = useState(0);
	const controls = useAnimation();
	const { resolvedTheme } = useTheme();

	const dynamicColor = resolvedTheme === 'dark' ? '#FCE24A' : '#E4620C';

	const pulse = async () => {
		try {
			controls.set({
				scale: 1,
				opacity: 0.6,
				backgroundColor: dynamicColor,
			});

			await controls.start({
				scale: 10,
				opacity: 0,
				backgroundColor: dynamicColor,
				transition: {
					duration: 0.5,
					delay: 0,
					ease: [0.85, 0, 0.3, 1],
				},
			});

			controls.set({
				scale: 1,
				opacity: 0,
				backgroundColor: 'transparent',
			});
		} catch (error) {
			console.error(error);
		} finally {
			controls.stop();
		}
	};

	return (
		<Card
			className={cn(
				'relative justify-center gap-4 rounded-3xl px-8 py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm max-md:bg-red-100',
			)}
		>
			<div className="flex items-center gap-x-4">
				<ProfileImage avatar={avatar} controls={controls} />
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
							<Icon
								weight="regular"
								className="size-4 text-theme"
							/>
							{label}
						</div>
					</Badge>
				))}
			</div>

			<Button
				variant="outline"
				size="icon"
				className={cn(
					'absolute top-5 right-5 size-10 rounded-full transition-all duration-300 ease-out hover:bg-background',
					'outline-hidden ring-2 ring-gray-200/45 focus-within:outline-hidden focus-within:ring-4 hover:ring-4 dark:text-black dark:ring-gray-200/30',
				)}
				onClick={() => {
					pulse();
					setAvatar((prev) => 1 - prev);
				}}
			>
				<motion.div
					className="flex items-center justify-center p-2"
					animate={{
						rotate: avatar ? -180 : 180,
					}}
					transition={{
						ease: [0.85, 0, 0.3, 1],
						duration: 0.5,
					}}
				>
					<ArrowsCounterClockwiseIcon
						weight="regular"
						className="size-5 text-current"
					/>
				</motion.div>
			</Button>

			<Beam
				duration={8}
				size={100}
				colorFrom={dynamicColor}
				colorTo={dynamicColor}
			/>
			<Pattern />
		</Card>
	);
});

Description.displayName = 'Description';
