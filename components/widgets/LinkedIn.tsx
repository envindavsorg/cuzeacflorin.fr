import type React from 'react';
import { memo } from 'react';
import { FaArrowRight, FaLinkedin } from 'react-icons/fa6';
import { Anchor } from '@/components/ui/Anchor';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export const LinkedIn = memo(
	(): React.JSX.Element => (
		<Card
			className={cn(
				'relative h-full items-center justify-center gap-6 rounded-3xl bg-[#0A66C2] px-8 py-2 dark:bg-[#0A66C2]',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<div className="absolute bottom-3 left-3">
				<Anchor
					className="cancel-drag"
					href="https://linkedin.com/in/maulana-ahmad"
					target="_blank"
				>
					<FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
					<span className="sr-only">LinkedIn</span>
				</Anchor>
			</div>
			<FaLinkedin size="4rem" color="white" />
		</Card>
	),
);
