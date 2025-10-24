'use client';

import type { TargetAndTransition } from 'motion/react';
import { motion } from 'motion/react';
import type React from 'react';

const initialProps: TargetAndTransition = {
	pathLength: 0,
	opacity: 0,
};

const animateProps: TargetAndTransition = {
	pathLength: 1,
	opacity: 1,
};

type HolaEffectProps = React.ComponentProps<typeof motion.svg> & {
	speed?: number;
	strokeWidth?: number;
	onAnimationComplete?: () => void;
};

const HolaEffect = ({
	className,
	speed = 1,
	strokeWidth = 15,
	onAnimationComplete,
	...props
}: HolaEffectProps) => {
	const calc = (x: number) => x * speed;

	return (
		<motion.svg
			className={className}
			exit={{ opacity: 0 }}
			fill="none"
			initial={{ opacity: 1 }}
			stroke="currentColor"
			strokeWidth={strokeWidth}
			transition={{ duration: 0.5 }}
			viewBox="0 0 562 201"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>ciao</title>
			<motion.path
				animate={animateProps}
				d="M9.19238 169.922C36.6868 153.737 60.4736 133.429 87.0141 97.4976C105.641 72.279 114.752 49.6048 115.25 31.5363C115.498 18.1373 109.046 7.97252 96.8876 7.97252C83.4881 7.97252 75.0513 18.1373 69.8404 41.47C64.1332 67.113 59.9149 96.5373 49.2449 190.89"
				initial={initialProps}
				style={{ strokeLinecap: 'round' }}
				transition={{
					duration: calc(0.6),
					ease: 'easeInOut',
					opacity: { duration: 0.3 },
				}}
			/>
			<motion.path
				animate={animateProps}
				d="M50.2905 181.668C55.5546 135.394 76.54 98.5816 103.091 98.5816C118.972 98.5816 129.065 111.237 126.199 129.351C124.586 140.021 121.671 152.428 120.006 164.587C117.98 179.971 123.767 191.882 141.661 191.882C166.918 191.882 182.818 167.359 189.698 138.32"
				initial={initialProps}
				style={{ strokeLinecap: 'round' }}
				transition={{
					duration: calc(0.5),
					ease: 'easeInOut',
					delay: calc(0.5),
					opacity: { duration: 0.3, delay: calc(0.5) },
				}}
			/>
			<motion.path
				animate={animateProps}
				d="M235.101 94.8596C210.279 96.8662 191.711 117.904 188.203 146.721C184.977 173.023 199.617 192.875 222.942 192.875C251.23 192.875 269.592 168.557 270.833 138.284C271.825 109.252 257.93 94.6115 239.071 94.6115C224.183 94.6115 216.242 105.778 216.739 119.425C217.223 138.086 231.217 159.037 260.578 161.714C301.303 165.428 357.002 135.318 379.492 76.1213C385.979 59.0468 388.451 42.9403 388.451 31.6849C388.451 18.3394 384.232 8.09198 372.322 8.09198C360.659 8.09198 352.967 17.1479 346.019 31.4466C337.879 48.0304 331.857 71.9499 329.394 98.9887C323.19 166.835 337.086 191.882 366.814 191.882C396.941 191.882 416.863 165.769 425.478 135.565"
				initial={initialProps}
				style={{ strokeLinecap: 'round' }}
				transition={{
					duration: calc(0.7),
					ease: 'easeInOut',
					delay: calc(0.9),
					opacity: { duration: 0.3, delay: calc(0.9) },
				}}
			/>
			<motion.path
				animate={animateProps}
				d="M503.736 113.364C498.872 102.169 488.532 94.6114 472.072 94.6114C444.777 94.6114 424.264 121.907 422.917 151.187C421.743 177.986 434.109 193.051 451.722 192.874C476.723 192.624 495.1 168.069 503.303 116.111C504.315 109.701 505.364 103.007 506.376 96.5965"
				initial={initialProps}
				style={{ strokeLinecap: 'round' }}
				transition={{
					duration: calc(0.5),
					ease: 'easeInOut',
					delay: calc(1.5),
					opacity: { duration: 0.3, delay: calc(1.5) },
				}}
			/>
			<motion.path
				animate={animateProps}
				d="M506.375 96.5965C505.351 103.099 504.326 109.601 503.302 116.104C498.82 144.544 496.753 155.764 496.975 163.098C497.493 180.219 503.65 191.882 519.035 191.882C538.39 191.882 549.245 178.73 554.456 164.338"
				initial={initialProps}
				onAnimationComplete={onAnimationComplete}
				style={{ strokeLinecap: 'round' }}
				transition={{
					duration: calc(0.5),
					ease: 'easeInOut',
					delay: calc(1.9),
					opacity: { duration: 0.3, delay: calc(1.9) },
				}}
			/>
		</motion.svg>
	);
};

const getHolaSVG = (color: string): string =>
	`<svg width="562" height="201" viewBox="0 0 562 201" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.19238 169.922C36.6868 153.737 60.4736 133.429 87.0141 97.4976C105.641 72.279 114.752 49.6048 115.25 31.5363C115.498 18.1373 109.046 7.97252 96.8876 7.97252C83.4881 7.97252 75.0513 18.1373 69.8404 41.47C64.1332 67.113 59.9149 96.5373 49.2449 190.89" stroke="${color}" style="stroke:${color};stroke-opacity:1;" stroke-width="14.8883" stroke-linecap="round"/><path d="M50.2905 181.668C55.5546 135.394 76.54 98.5816 103.091 98.5816C118.972 98.5816 129.065 111.237 126.199 129.351C124.586 140.021 121.671 152.428 120.006 164.587C117.98 179.971 123.767 191.882 141.661 191.882C166.918 191.882 182.818 167.359 189.698 138.32" stroke="${color}" style="stroke:${color};stroke-opacity:1;" stroke-width="14.8883" stroke-linecap="round"/><path d="M235.101 94.8596C210.279 96.8662 191.711 117.904 188.203 146.721C184.977 173.023 199.617 192.875 222.942 192.875C251.23 192.875 269.592 168.557 270.833 138.284C271.825 109.252 257.93 94.6115 239.071 94.6115C224.183 94.6115 216.242 105.778 216.739 119.425C217.223 138.086 231.217 159.037 260.578 161.714C301.303 165.428 357.002 135.318 379.492 76.1213C385.979 59.0468 388.451 42.9403 388.451 31.6849C388.451 18.3394 384.232 8.09198 372.322 8.09198C360.659 8.09198 352.967 17.1479 346.019 31.4466C337.879 48.0304 331.857 71.9499 329.394 98.9887C323.19 166.835 337.086 191.882 366.814 191.882C396.941 191.882 416.863 165.769 425.478 135.565" stroke="${color}" style="stroke:${color};stroke-opacity:1;" stroke-width="14.8883" stroke-linecap="round"/><path d="M503.736 113.364C498.872 102.169 488.532 94.6114 472.072 94.6114C444.777 94.6114 424.264 121.907 422.917 151.187C421.743 177.986 434.109 193.051 451.722 192.874C476.723 192.624 495.1 168.069 503.303 116.111C504.315 109.701 505.364 103.007 506.376 96.5965" stroke="${color}" style="stroke:${color};stroke-opacity:1;" stroke-width="14.8883" stroke-linecap="round"/><path d="M506.375 96.5965C505.351 103.099 504.326 109.601 503.302 116.104C498.82 144.544 496.753 155.764 496.975 163.098C497.493 180.219 503.65 191.882 519.035 191.882C538.39 191.882 549.245 178.73 554.456 164.338" stroke="${color}" style="stroke:${color};stroke-opacity:1;" stroke-width="14.8883" stroke-linecap="round"/></svg>`;

export { HolaEffect, getHolaSVG };
