import { LayoutGroup, motion } from 'motion/react';
import Image from 'next/image';
import type React from 'react';
import { PROFILE_CONFIG } from '@/resources/profile';

const { image, avatars } = PROFILE_CONFIG;

const ROTATION_ANGLE = 30;
const SCALE_SMALL = 0.4;
const EASE_CURVE = [0.85, 0, 0.3, 1] as const;
const ANIMATION_DURATION = 0.5;

type ProfileImageProps = {
	avatar: number;
	isUserInteraction: boolean;
	pulseRef: React.RefObject<HTMLDivElement>;
};

export const ProfileImage = ({
	avatar,
	isUserInteraction,
	pulseRef,
}: ProfileImageProps): React.JSX.Element => {
	const MotionImage = motion.create(Image);

	const animate = isUserInteraction
		? { opacity: 1, scale: 1, rotate: 0 }
		: undefined;

	const exitRotate = avatar % 2 === 0 ? ROTATION_ANGLE : -ROTATION_ANGLE;
	const exit = isUserInteraction
		? { opacity: 0, scale: SCALE_SMALL, rotate: exitRotate }
		: undefined;

	const initialRotate = avatar % 2 === 0 ? -ROTATION_ANGLE : ROTATION_ANGLE;
	const initial = isUserInteraction
		? { opacity: 0, scale: SCALE_SMALL, rotate: initialRotate }
		: { opacity: 1, scale: 1, rotate: 0 };

	const transition = isUserInteraction
		? { ease: EASE_CURVE, duration: ANIMATION_DURATION }
		: { duration: 0 };

	return (
		<LayoutGroup>
			<div className="relative">
				<div className="relative h-18 w-12 overflow-hidden md:h-20 md:w-14">
					<MotionImage
						alt={image.alt}
						animate={animate}
						className="relative z-10 h-full object-cover"
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
					className="lg:-translate-x-1/2 lg:-translate-y-1/2 absolute top-4 left-2 size-8 rounded-full lg:top-1/2 lg:left-1/2"
					ref={pulseRef}
				/>
			</div>
		</LayoutGroup>
	);
};

ProfileImage.displayName = 'ProfileImage';
