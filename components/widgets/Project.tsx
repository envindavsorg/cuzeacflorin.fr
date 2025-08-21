import Image from 'next/image';
import type React from 'react';
import { memo } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Anchor } from '@/components/ui/Anchor';
import { Card } from '@/components/ui/Card';
import { cn, toKebabCase } from '@/lib/utils';
import projectImage from '@/public/projects/next-blog-starter.png';

export const Project = memo((): React.JSX.Element => {
	const projectName = 'Next Blog Starter';

	return (
		<Card
			className={cn(
				'group relative justify-center gap-6 rounded-3xl bg-red-100 px-8 py-2',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<Image
				alt={toKebabCase(projectName)}
				className="object-cover"
				draggable="false"
				fill
				placeholder="blur"
				priority
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				src={projectImage}
			/>
			<div className="absolute bottom-3 left-3">
				<Anchor
					aria-label={projectName}
					className="cancel-drag size-10 justify-end transition-all ease-in-out group-hover:w-full"
					href={`/projects/${toKebabCase(projectName)}`}
				>
					<span className="hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:opacity-100 md:inline">
						{projectName}
					</span>
					<span>
						<FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
					</span>
				</Anchor>
			</div>
		</Card>
	);
});
