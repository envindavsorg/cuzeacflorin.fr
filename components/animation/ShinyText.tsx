import type React from 'react';
import { cn } from '@/lib/utils';

type ShinyTextProps = {
	text: string;
	disabled?: boolean;
	speed?: number;
	className?: string;
};

export const ShinyText = ({
	text,
	disabled = false,
	speed = 5,
	className = '',
}: ShinyTextProps): React.JSX.Element => {
	const animationDuration = `${speed}s`;

	return (
		<div
			className={cn(
				'inline-block bg-clip-text font-pixelify-sans text-2xl text-foreground tracking-wide md:text-3xl',
				disabled ? '' : 'animate-shine',
				className
			)}
			style={{
				backgroundImage:
					'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
				backgroundSize: '200% 100%',
				WebkitBackgroundClip: 'text',
				animationDuration,
			}}
		>
			{text}
		</div>
	);
};
