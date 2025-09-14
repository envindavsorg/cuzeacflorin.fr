'use client';

import { ArrowsCounterClockwiseIcon } from '@phosphor-icons/react';
import { LayoutGroup, motion, useAnimate } from 'motion/react';
import Image from 'next/image';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName, welcome, avatars } = PROFILE_CONFIG;

const GENTLE_EASE = [0.4, 0, 0.2, 1] as const;
const PULSE_DURATION = 1.2;
const PULSE_MAX_SCALE = 6;
const PULSE_INITIAL_OPACITY = 0.25;
const ROTATION_ANGLE = 180;
const EASE_CURVE = [0.85, 0, 0.3, 1] as const;

const ANIMATION_CONFIG = {
	pulse: {
		duration: PULSE_DURATION,
		scale: PULSE_MAX_SCALE,
		initialOpacity: PULSE_INITIAL_OPACITY,
		spring: {
			type: 'spring' as const,
			stiffness: 100,
			damping: 20,
			mass: 0.8,
		},
	},
	rotate: {
		duration: 0.6,
		ease: GENTLE_EASE,
	},
} as const;

export const NavBar = (): React.JSX.Element => {
	const [pulseScope, animatePulse] = useAnimate<HTMLDivElement>();
	const [avatar, setAvatar] = useState(0);
	const [isRotated, setIsRotated] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);
	const isUserInteractionRef = useRef(false);

	const pulse = useCallback(async (): Promise<void> => {
		if (!(pulseScope.current && isUserInteractionRef.current)) {
			return;
		}

		pulseScope.current.style.backgroundColor = 'var(--color-theme)';
		pulseScope.current.style.opacity = '0';
		pulseScope.current.style.transform = 'scale(1)';

		await animatePulse([
			[
				pulseScope.current,
				{
					scale: [1, ANIMATION_CONFIG.pulse.scale],
					opacity: [ANIMATION_CONFIG.pulse.initialOpacity, 0],
				},
				{ duration: ANIMATION_CONFIG.pulse.duration, ease: GENTLE_EASE },
			],
		]);

		pulseScope.current.style.backgroundColor = 'transparent';
		pulseScope.current.style.opacity = '0';
		pulseScope.current.style.transform = 'scale(1)';
	}, [animatePulse, pulseScope]);

	const handleClick = useCallback(async (): Promise<void> => {
		isUserInteractionRef.current = true;
		const totalAvatars = avatars.length;
		const newAvatar = (avatar + 1) % totalAvatars;
		setAvatar(newAvatar);
		setIsRotated(!isRotated);
		setHasUserInteracted(true);
		setHasAnimated(true);
		await pulse();
	}, [pulse, avatar, isRotated]);

	const MotionImage = motion.create(Image);

	const animate = hasUserInteracted
		? { opacity: 1, scale: 1, rotate: 0 }
		: undefined;

	const exitRotate = avatar % 2 === 0 ? 30 : -30;
	const exit = hasUserInteracted
		? { opacity: 0, scale: 0.4, rotate: exitRotate }
		: undefined;

	const initialRotate = avatar % 2 === 0 ? -30 : 30;
	const initial = hasUserInteracted
		? { opacity: 0, scale: 0.4, rotate: initialRotate }
		: { opacity: 1, scale: 1, rotate: 0 };

	const transition = hasUserInteracted
		? { ease: EASE_CURVE, duration: 0.5 }
		: { duration: 0 };

	return (
		<div className="mx-auto flex w-full max-w-7xl items-center justify-between py-6">
			<LayoutGroup>
				<div className="absolute z-10">
					<div className="h-12 w-8 overflow-hidden">
						<MotionImage
							alt={`${firstName} ${lastName}`}
							animate={animate}
							className="z-10 h-full object-cover"
							exit={exit}
							fill
							initial={initial}
							key={avatar}
							priority
							sizes="(max-width: 768px) 48px, 56px"
							src={avatars[avatar]}
							transition={transition}
						/>
					</div>
					<div
						className="absolute top-3.5 left-2 size-4 rounded-full sm:top-3 sm:left-1 sm:size-6"
						ref={pulseScope}
					/>
				</div>
			</LayoutGroup>
			<div className="ml-12 flex flex-col">
				<h1>
					<span
						className={cn(
							'bg-clip-text font-inter-tight font-semibold text-2xl text-transparent tracking-tight lg:text-3xl',
							'bg-gradient-to-t from-theme via-theme to-theme font-inter-tight'
						)}
					>
						{firstName} {lastName}
					</span>
				</h1>
				<span className="text-muted-foreground text-xs italic">
					- {welcome}
				</span>
			</div>

			<div className="flex items-center gap-x-6 sm:gap-x-8">
				<ThemeSwitcher />
				<motion.button
					aria-label="Mes humeurs !"
					className="cursor-pointer"
					onClick={handleClick}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<motion.div
						animate={{ rotate: isRotated ? ROTATION_ANGLE : -ROTATION_ANGLE }}
						transition={{
							duration: hasAnimated ? ANIMATION_CONFIG.rotate.duration : 0,
							ease: ANIMATION_CONFIG.rotate.ease,
						}}
					>
						<ArrowsCounterClockwiseIcon className="size-6" />
					</motion.div>
				</motion.button>
			</div>
		</div>
	);
};
