import { ArrowsCounterClockwiseIcon } from '@phosphor-icons/react';
import {
	type AnimationSequence,
	motion,
	type SequenceOptions,
} from 'motion/react';
import type React from 'react';
import { memo, type RefObject, useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/Tooltip';
import { PROFILE_CONFIG } from '@/resources/profile';

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

type ToggleAvatarProps = {
	animatePulse: (
		sequence: AnimationSequence,
		options?: SequenceOptions | undefined
	) => any;
	pulseScope: RefObject<HTMLDivElement>;
	color: string;
	avatar: number;
	setAvatar: React.Dispatch<React.SetStateAction<number>>;
	isUserInteractionRef: React.RefObject<boolean>;
	setHasUserInteracted: React.Dispatch<React.SetStateAction<boolean>>;
};

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
		const [isRotated, setIsRotated] = useState(false);
		const [hasAnimated, setHasAnimated] = useState(false);

		const pulse = useCallback(async (): Promise<void> => {
			if (!(pulseScope.current && isUserInteractionRef.current)) {
				return;
			}

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
		}, [animatePulse, pulseScope, color, isUserInteractionRef.current]);

		const handleClick = useCallback(async (): Promise<void> => {
			isUserInteractionRef.current = true;
			const totalAvatars = PROFILE_CONFIG.avatars.length;
			const newAvatar = (avatar + 1) % totalAvatars;
			setAvatar(newAvatar);
			setIsRotated(!isRotated);
			setHasUserInteracted(true);
			setHasAnimated(true);
			await pulse();
		}, [
			pulse,
			setAvatar,
			avatar,
			isRotated,
			setHasUserInteracted,
			isUserInteractionRef,
		]);

		const MotionButton = motion.create(Button);

		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<MotionButton
						aria-label="Mes humeurs !"
						className="group absolute top-5 right-5 z-10"
						onClick={handleClick}
						size="icon"
						variant="icon"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<motion.div
							animate={{
								rotate: isRotated ? ROTATION_ANGLE : -ROTATION_ANGLE,
							}}
							className="flex items-center justify-center p-2"
							transition={{
								duration: hasAnimated ? ANIMATION_CONFIG.rotate.duration : 0,
								ease: ANIMATION_CONFIG.rotate.ease,
							}}
						>
							<ArrowsCounterClockwiseIcon className="size-4.5 text-black" />
						</motion.div>
					</MotionButton>
				</TooltipTrigger>
				<TooltipContent align="center" side="left" sideOffset={5}>
					<p>Mes humeurs !</p>
				</TooltipContent>
			</Tooltip>
		);
	}
);
