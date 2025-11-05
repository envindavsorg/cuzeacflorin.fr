import Link from 'next/link';
import type React from 'react';
import { Card } from '@/components/ui/Card';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { cn } from '@/lib/utils';
import type { Port } from '../types';

type FavoritePortsProps = {
	ports: Port[];
};

const PortLink: React.FC<{
	port: Port;
}> = ({ port }) => (
	<Link
		data-tip={port.isActive ? 'This port is active' : ''}
		href={`http://localhost:${port.number}`}
		rel="noopener noreferrer"
		target="_blank"
	>
		<Card
			className={cn(
				'relative flex flex-col gap-y-2 border-edge px-4 py-3',
				'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
				'bg-black/0.75 bg-center bg-size-[10px_10px] dark:bg-white/0.75',
				'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5',
				'outline-1 outline-offset-1',
				'transform transition-transform hover:scale-102',
				port.color
			)}
		>
			<div className="flex items-center justify-between">
				<h4 className="font-bold font-mono text-lg tabular-nums leading-none sm:text-xl">
					{port.number}
				</h4>

				<div className="relative flex items-center justify-center">
					<span
						className={cn(
							'absolute inline-flex size-3 rounded-full opacity-50',
							port.isActive !== undefined && port.isActive
								? 'animate-ping bg-green-600 dark:bg-green-300'
								: 'bg-red-600 dark:bg-red-300'
						)}
					/>
					<span
						className={cn(
							'relative inline-flex size-2 rounded-full',
							port.isActive !== undefined && port.isActive
								? 'bg-green-600 dark:bg-green-300'
								: 'bg-red-600 dark:bg-red-300'
						)}
					/>
				</div>
			</div>
			<p className="text-muted-foreground text-sm">{port.description}</p>
		</Card>
	</Link>
);

export const FavoritePorts: React.FC<FavoritePortsProps> = ({ ports }) => (
	<Panel className="!border-x-0">
		<PanelHeader>
			<PanelTitle>Raccourcis vers les projets ...</PanelTitle>
		</PanelHeader>

		<PanelContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
			{ports.map((port) => (
				<PortLink key={port.number} port={port} />
			))}
		</PanelContent>
	</Panel>
);
