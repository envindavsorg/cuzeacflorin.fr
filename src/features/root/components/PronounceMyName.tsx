'use client';

import { SpeakerHighIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { soundManager } from '../../../lib/sound-manager';
import { cn } from '../../../lib/utils';

type PronounceMyNameProps = {
	className?: string;
	namePronunciationUrl: string;
};

export const PronounceMyName = ({
	className,
	namePronunciationUrl,
}: PronounceMyNameProps) => (
	<motion.button
		aria-label="Prononcer mon prénom"
		className={cn(
			'relative select-none',
			'cursor-pointer text-muted-foreground hover:text-foreground',
			className
		)}
		onClick={() => soundManager.playAudio(namePronunciationUrl)}
		title="Prononcer mon prénom"
		type="button"
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
	>
		<SpeakerHighIcon className="text-xl sm:text-2xl" />
		<span className="sr-only">Prononcer mon prénom</span>
	</motion.button>
);
