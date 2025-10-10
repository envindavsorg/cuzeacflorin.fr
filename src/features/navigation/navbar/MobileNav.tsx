'use client';

import {
	CodeBlockIcon,
	HouseIcon,
	ListIcon,
	PenNibIcon,
	XIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import type React from 'react';
import { Button } from '../../../components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../../components/ui/DropdownMenu';
import type { NavigationItem } from './Nav';
import { cn } from '../../../lib/utils';

type MobileNavProps = {
	items: NavigationItem[];
	className?: string;
};

export const MobileNav = ({
	items,
	className,
}: MobileNavProps): React.JSX.Element => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button
				className={cn('group/toggle flex flex-col gap-1', className)}
				size="icon"
				variant="ghost"
			>
				<ListIcon className="size-6 text-foreground group-data-[state=open]/toggle:hidden" />
				<XIcon className="size-6 text-red-600 group-data-[state=closed]/toggle:hidden dark:text-red-300" />
				<span className="sr-only">Ouvrir et fermer le menu mobile</span>
			</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent align="end" className="w-40 py-2" sideOffset={8}>
			{items.map((link: NavigationItem, idx: number) => (
				<DropdownMenuItem
					asChild
					className="font-medium text-sm"
					key={link.href}
				>
					<div className="flex items-center gap-x-2">
						{link.title === 'Accueil' && (
							<HouseIcon className="size-4 text-foreground" />
						)}
						{link.title === 'Blog' && (
							<PenNibIcon className="size-4 text-foreground" />
						)}
						{link.title === 'Composants' && (
							<CodeBlockIcon className="size-4 text-foreground" />
						)}

						<Link href={link.href}>
							{link.title}{' '}
							<sup className="font-semibold text-theme">0{idx + 1}</sup>
						</Link>
					</div>
				</DropdownMenuItem>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);
