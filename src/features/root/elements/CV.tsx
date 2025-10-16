import { ArrowDownIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import type React from 'react';
import { Panel, PanelHeader, PanelTitle } from '@/components/ui/Panel';

export const CV = (): React.JSX.Element => (
	<Panel>
		<Link
			aria-label="Voir et télécharger mon CV"
			className="no-underline"
			href={process.env.CV_URL || '#'}
			rel="noopener noreferrer"
			target="_blank"
		>
			<PanelHeader className="group flex items-center justify-center gap-x-3 p-4">
				<ArrowDownIcon
					className="size-6 text-theme transition-transform duration-500 ease-in-out group-hover:rotate-180"
					weight="duotone"
				/>
				<PanelTitle className="!text-xl">Voir et télécharger mon CV</PanelTitle>
			</PanelHeader>
		</Link>
	</Panel>
);
