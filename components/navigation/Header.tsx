'use client';

import { XIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type HeaderProps = {
	className?: string;
};

export const Header = ({ className }: HeaderProps): React.JSX.Element => {
	const MotionButton = motion.create(Button);

	return (
		<header className="flex items-center justify-center">
			<MotionButton
				className={cn('group bg-white', className)}
				size="icon"
				variant="icon"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<Link aria-label="Retour en arrière" href="/">
					<XIcon className="size-4.5 text-black transition-transform duration-300 group-hover:rotate-90" />
					<span className="sr-only">Retour en arrière</span>
				</Link>
			</MotionButton>
		</header>
	);
};
