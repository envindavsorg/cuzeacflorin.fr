import { LinkedinLogoIcon } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo } from 'react';
import { getLinkedInFollowers } from '@/actions/linkedin.action';
import { Card } from '@/components/ui/Card';
import { ActionLink } from '@/components/widgets/linkedin/ActionLink';
import { cn } from '@/lib/utils';

export const LinkedInWidget = memo(async (): Promise<React.JSX.Element> => {
	const data = await getLinkedInFollowers();

	return (
		<Card
			className={cn(
				'relative justify-center rounded-3xl bg-linkedin p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm',
			)}
		>
			<div className="flex h-full flex-col justify-between">
				<div className="inline-block">
					<LinkedinLogoIcon
						className="size-18 text-white"
						weight="regular"
					/>
				</div>

				<div className="flex flex-col">
					<h3 className="font-bold font-pixelify-sans text-white text-xl md:text-3xl">
						{data.count.toLocaleString('fr-FR')}
					</h3>
					<h3 className="font-bold font-pixelify-sans text-white text-xl md:text-3xl">
						abonnés
					</h3>
				</div>
			</div>

			<ActionLink />
		</Card>
	);
});
