'use client';

import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import type React from 'react';
import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/Tooltip';

type ZoomControlsProps = {
	canZoomIn: boolean;
	canZoomOut: boolean;
	onZoomIn: () => void;
	onZoomOut: () => void;
};

export const ZoomControls = memo(
	({
		canZoomIn,
		canZoomOut,
		onZoomIn,
		onZoomOut,
	}: ZoomControlsProps): React.JSX.Element => {
		const MotionButton = motion.create(Button);

		return (
			<div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
				<Tooltip>
					<TooltipTrigger asChild>
						<MotionButton
							aria-label="Réduire"
							className="group"
							disabled={!canZoomOut}
							onClick={onZoomOut}
							size="icon"
							variant="icon"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<MinusIcon className="size-4.5 text-black transition-transform duration-300 group-hover:rotate-180" />
						</MotionButton>
					</TooltipTrigger>
					<TooltipContent align="center" side="right" sideOffset={5}>
						Réduire
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<MotionButton
							aria-label="Agrandir"
							className="group"
							disabled={!canZoomIn}
							onClick={onZoomIn}
							size="icon"
							variant="icon"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<PlusIcon className="size-4.5 text-black transition-transform duration-300 group-hover:rotate-180" />
						</MotionButton>
					</TooltipTrigger>
					<TooltipContent align="center" side="left" sideOffset={5}>
						Agrandir
					</TooltipContent>
				</Tooltip>
			</div>
		);
	}
);
