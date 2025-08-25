'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { Safari } from '@/components/elements/Safari';
import { Card } from '@/components/ui/Card';
import { PortfolioLink } from '@/components/widgets/portfolio/PortfolioLink';
import portfolioBgDark from '@/images/portfolio/bg/dark.svg';
import portfolioBgLight from '@/images/portfolio/bg/light.svg';
import { cn, toKebabCase } from '@/lib/utils';
import { baseURL } from '@/resources/meta';

const projectName = 'My portfolio project';

export const PortfolioWidget = memo((): React.JSX.Element => {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Card
			className={cn(
				'relative justify-center gap-y-4 rounded-3xl p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<Image
				alt="Comment j'ai crée mon portfolio !"
				className="h-full w-full object-cover"
				draggable="false"
				fill
				priority
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				src={
					!mounted || resolvedTheme === 'light'
						? portfolioBgLight
						: portfolioBgDark
				}
			/>

			<Safari
				className="-rotate-10 md:-rotate-20 lg:-rotate-25 absolute top-25 left-15 h-full w-120 md:top-20 md:left-20 lg:top-5 lg:left-15"
				imageSrc={
					!mounted || resolvedTheme === 'light'
						? '/images/portfolio/screen/light.webp'
						: '/images/portfolio/screen/dark.webp'
				}
				url={baseURL}
			/>

			<h3 className="absolute top-5 left-5 font-bold font-pixelify-sans text-3xl text-background">
				Mon
				<br />
				portfolio
			</h3>

			<PortfolioLink
				className="absolute top-5 right-5"
				label={projectName}
				url={`/projects/${toKebabCase(projectName)}`}
			/>
		</Card>
	);
});
