'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { PortfolioLink } from '@/components/widgets/portfolio/PortfolioLink';
import portfolioBgDark from '@/images/portfolio/bg/dark.svg';
import portfolioBgLight from '@/images/portfolio/bg/light.svg';
import portfolioScreen from '@/images/portfolio/portfolio-screen.webp';
import { cn, toKebabCase } from '@/lib/utils';

const projectName = 'My portfolio project';

export const PortfolioWidget = memo((): React.JSX.Element => {
	const { resolvedTheme } = useTheme();

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
				src={resolvedTheme === 'dark' ? portfolioBgDark : portfolioBgLight}
			/>

			<Image
				alt="Comment j'ai crée mon portfolio !"
				className="absolute top-0 left-0 h-full w-full object-cover"
				draggable="false"
				fill
				priority
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				src={portfolioScreen}
			/>

			<h3 className="absolute top-5 left-5 font-bold font-pixelify-sans text-3xl text-white">
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
