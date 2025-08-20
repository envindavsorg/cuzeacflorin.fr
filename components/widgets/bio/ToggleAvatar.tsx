import { ArrowsCounterClockwiseIcon } from '@phosphor-icons/react';
import { motion, useAnimate } from 'motion/react';
import type React from 'react';
import { memo, type RefObject, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { logger } from '@/lib/logger';

type ToggleAvatarProps = {
	animatePulse: (sequence: any[], options?: any) => any;
	pulseScope: RefObject<HTMLDivElement>;
	color: string;
	avatar: number;
	setAvatar: React.Dispatch<React.SetStateAction<number>>;
	isUserInteractionRef: React.RefObject<boolean>;
	setHasUserInteracted: React.Dispatch<React.SetStateAction<boolean>>;
};

const GENTLE_EASE = [0.4, 0, 0.2, 1] as const;
const PULSE_DURATION = 1.2;
const PULSE_MAX_SCALE = 6;
const PULSE_INITIAL_OPACITY = 0.25;
const ROTATION_ANGLE = 180;

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

export const ToggleAvatar = memo(
	({
		animatePulse,
		pulseScope,
		color,
		avatar,
		setAvatar,
		isUserInteractionRef,
		setHasUserInteracted,
	}: ToggleAvatarProps): React.JSX.Element => {
		const [iconScope, animateIcon] = useAnimate<HTMLDivElement>();
		const pulse = useCallback(async () => {
			if (!(pulseScope.current && isUserInteractionRef.current)) {
				return;
			}

			try {
				pulseScope.current.style.backgroundColor = color;
				pulseScope.current.style.opacity = '0';
				pulseScope.current.style.transform = 'scale(1)';

				await animatePulse([
					[
						pulseScope.current,
						{
							scale: [1, ANIMATION_CONFIG.pulse.scale],
							opacity: [ANIMATION_CONFIG.pulse.initialOpacity, 0],
						},
						{
							duration: ANIMATION_CONFIG.pulse.duration,
							ease: GENTLE_EASE,
						},
					],
				]);

				pulseScope.current.style.backgroundColor = 'transparent';
				pulseScope.current.style.opacity = '0';
				pulseScope.current.style.transform = 'scale(1)';
			} catch (error) {
				logger.error('Avatar pulse animation error:', error);
			}
		}, [animatePulse, pulseScope, color, isUserInteractionRef.current]);

		const handleClick = useCallback(async () => {
			isUserInteractionRef.current = true;
			setHasUserInteracted(true);

			const newAvatar = 1 - avatar;
			const rotationAngle = newAvatar ? -ROTATION_ANGLE : ROTATION_ANGLE;

			if (iconScope.current) {
				iconScope.current.style.transform = 'rotate(0deg)';
				await animateIcon(
					iconScope.current,
					{ rotate: rotationAngle },
					ANIMATION_CONFIG.rotate
				);
			}

			setAvatar(newAvatar);
			await pulse();
		}, [
			pulse,
			setAvatar,
			avatar,
			animateIcon,
			iconScope,
			setHasUserInteracted,
			isUserInteractionRef,
		]);

		const MotionButton: MotionButton = motion.create(Button);

		return (
			<MotionButton
				className="absolute top-5 right-5"
				onClick={handleClick}
				size="icon"
				variant="icon"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<motion.div
					className="flex items-center justify-center p-2"
					ref={iconScope}
				>
					<ArrowsCounterClockwiseIcon className="size-5" weight="regular" />
				</motion.div>
			</MotionButton>
		);
	}
);
