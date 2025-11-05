'use client';

import {
	DownloadIcon,
	FilePngIcon,
	FileSvgIcon,
	TriangleDashedIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import type React from 'react';
import { toast } from 'sonner';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import copyText from '@/utils/copy';
import { getBonjourSVG } from '../effects/Bonjour';
import { getHelloSVG } from '../effects/Hello';
import { getHolaSVG } from '../effects/Hola';
import { EnglishFlag } from '../icons/EnglishFlag';
import { FrenchFlag } from '../icons/FrenchFlag';
import { SpanishFlag } from '../icons/SpanishFlag';

type GreetingsContextProps = {
	children: React.ReactNode;
};

export const GreetingsContext = ({
	children,
}: GreetingsContextProps): React.JSX.Element => {
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === 'dark';

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

			<ContextMenuContent className="w-64">
				<Tabs defaultValue="french">
					<TabsList>
						<TabsTrigger value="french">
							<FrenchFlag className="size-5" />
						</TabsTrigger>
						<TabsTrigger value="english">
							<EnglishFlag className="size-5" />
						</TabsTrigger>
						<TabsTrigger value="spanish">
							<SpanishFlag className="size-5" />
						</TabsTrigger>
					</TabsList>

					<TabsContent value="french">
						<ContextMenuItem
							className="cursor-pointer"
							onClick={() => {
								const svg = getBonjourSVG(isDark ? 'black' : 'white');
								copyText(svg);
								toast.success('SVG copié dans le presse-papiers', {
									description: `Couleur appliquée: ${isDark ? 'noir (#000000)' : 'blanc (#FFFFFF)'}`,
								});
							}}
						>
							<TriangleDashedIcon className="size-5" />
							<p className="text-sm">Copier l'effet en SVG</p>
						</ContextMenuItem>
						<ContextMenuItem asChild className="cursor-pointer">
							<Link
								aria-label="Bonjour"
								download
								href={`/assets/bonjour/svg/bonjour-${resolvedTheme}.svg`}
							>
								<FileSvgIcon className="size-5" />
								<p className="text-sm">Télécharger au format SVG</p>
							</Link>
						</ContextMenuItem>
						<ContextMenuItem asChild className="cursor-pointer">
							<Link
								aria-label="Bonjour"
								download
								href={`/assets/bonjour/png/bonjour-${resolvedTheme}.png`}
							>
								<FilePngIcon className="size-5" />
								<p className="text-sm">Télécharger au format PNG</p>
							</Link>
						</ContextMenuItem>
					</TabsContent>

					<TabsContent value="english">
						<ContextMenuItem
							className="cursor-pointer"
							onClick={() => {
								const svg = getHelloSVG(isDark ? 'black' : 'white');
								copyText(svg);
								toast.success('SVG copié dans le presse-papiers', {
									description: `Couleur appliquée: ${isDark ? 'noir (#000000)' : 'blanc (#FFFFFF)'}`,
								});
							}}
						>
							<TriangleDashedIcon className="size-5" />
							<p className="text-sm">Copier l'effet en SVG</p>
						</ContextMenuItem>
						<ContextMenuItem asChild className="cursor-pointer">
							<Link
								aria-label="Hello"
								download
								href={`/assets/hello/svg/hello-${resolvedTheme}.svg`}
							>
								<FileSvgIcon className="size-5" />
								<p className="text-sm">Télécharger au format SVG</p>
							</Link>
						</ContextMenuItem>
						<ContextMenuItem asChild className="cursor-pointer">
							<Link
								aria-label="Hello"
								download
								href={`/assets/hello/png/hello-${resolvedTheme}.png`}
							>
								<FilePngIcon className="size-5" />
								<p className="text-sm">Télécharger au format PNG</p>
							</Link>
						</ContextMenuItem>
					</TabsContent>

					<TabsContent value="spanish">
						<ContextMenuItem
							className="cursor-pointer"
							onClick={() => {
								const svg = getHolaSVG(isDark ? 'black' : 'white');
								copyText(svg);
								toast.success('SVG copié dans le presse-papiers', {
									description: `Couleur appliquée: ${isDark ? 'noir (#000000)' : 'blanc (#FFFFFF)'}`,
								});
							}}
						>
							<TriangleDashedIcon className="size-5" />
							<p className="text-sm">Copier l'effet en SVG</p>
						</ContextMenuItem>
						<ContextMenuItem asChild className="cursor-pointer">
							<Link
								aria-label="Hola"
								download
								href={`/assets/hola/svg/hola-${resolvedTheme}.svg`}
							>
								<FileSvgIcon className="size-5" />
								<p className="text-sm">Télécharger au format SVG</p>
							</Link>
						</ContextMenuItem>
						<ContextMenuItem asChild className="cursor-pointer">
							<Link
								aria-label="Hola"
								download
								href={`/assets/hola/png/hola-${resolvedTheme}.png`}
							>
								<FilePngIcon className="size-5" />
								<p className="text-sm">Télécharger au format PNG</p>
							</Link>
						</ContextMenuItem>
					</TabsContent>
				</Tabs>

				<ContextMenuSeparator />

				<ContextMenuItem asChild className="cursor-pointer">
					<Link download href="/assets/all-effects.zip">
						<DownloadIcon className="size-5" />
						Télécharger tous les assets
					</Link>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};
