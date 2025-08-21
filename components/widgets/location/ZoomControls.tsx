'use client';

import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import type React from 'react';
import { memo } from 'react';
import { Button } from '@/components/ui/Button';

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
				<MotionButton
					disabled={!canZoomOut}
					onClick={onZoomOut}
					size="icon"
					variant="icon"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<MinusIcon className="size-4.5" />
				</MotionButton>
				<MotionButton
					disabled={!canZoomIn}
					onClick={onZoomIn}
					size="icon"
					variant="icon"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<PlusIcon className="size-4.5" />
				</MotionButton>
			</div>
		);
	}
);

ZoomControls.displayName = 'ZoomControls';
