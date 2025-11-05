'use client';

import { SpeakerHighIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import type React from 'react';
import { soundManager } from '@/lib/sound-manager';
import { cn } from '@/lib/utils';

type PronounceNameProps = {
	className?: string;
	namePronunciationUrl: string;
};

export const PronounceName = ({
	className,
	namePronunciationUrl,
}: PronounceNameProps): React.JSX.Element => (
	<motion.button
		aria-label="Prononcer mon prénom"
		className={cn(
			'relative translate-y-px select-none',
			'cursor-pointer text-muted-foreground hover:text-foreground',
			className
		)}
		onClick={() => soundManager.playAudio(namePronunciationUrl)}
		title="Prononcer mon prénom"
		type="button"
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
	>
		<SpeakerHighIcon className="size-5 sm:size-6" />
		<span className="sr-only">Prononcer mon prénom</span>
	</motion.button>
);
