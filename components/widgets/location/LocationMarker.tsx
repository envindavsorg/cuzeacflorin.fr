'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import type React from 'react';
import { memo, useMemo } from 'react';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName, avatars } = PROFILE_CONFIG;

type LocationMarkerProps = {
	mouseEntered: boolean;
};

export const LocationMarker = memo(
	({ mouseEntered }: LocationMarkerProps): React.JSX.Element =>
		useMemo(
			() => (
				<motion.div
					animate={{ scale: mouseEntered ? 1.1 : 1 }}
					className="z-1 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-theme/20 ring ring-theme will-change-transform"
					transition={{ ease: [0.85, 0, 0.3, 1], duration: 0.5 }}
				>
					<motion.div
						animate={{
							scale: mouseEntered ? [1, 1.2, 1, 1.2, 1] : 1,
							rotate: mouseEntered ? [0, 15, 0, -15, 0] : 1,
						}}
						transition={{
							repeat: mouseEntered ? 1 / 0 : 0,
							duration: mouseEntered ? 1.6 : 0.5,
						}}
					>
						<Image
							alt={`${firstName} ${lastName}`}
							height={44}
							priority
							sizes="(max-width: 768px) 48px, 56px"
							src={avatars[4]}
							width={32}
						/>
					</motion.div>
				</motion.div>
			),
			[mouseEntered],
		),
);

LocationMarker.displayName = 'LocationMarker';
