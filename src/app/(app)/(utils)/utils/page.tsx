import { PaletteIcon, TextTIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Outils web',
	description:
		'Différents outils pour les développeurs web, utiles dans la vie de tous les jours.',
};

const UtilsPage = () => (
	<div className="min-h-svh">
		<div className="screen-line-after px-4">
			<h1 className="font-semibold text-3xl sm:text-4xl">
				{String(metadata.title)}
			</h1>
		</div>

		<div className="screen-line-after border-edge border-t p-4">
			<p className="font-mono text-muted-foreground text-sm">
				{String(metadata.description)}
			</p>
		</div>

		<Link
			aria-label="Générateur de couleurs (shadcn/ui)"
			className="group/post flex items-center border-edge border-b pr-4"
			href="/utils/color-generator"
		>
			<div
				aria-hidden
				className="mx-4 flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
			>
				<PaletteIcon className="pointer-events-none size-5 text-muted-foreground" />
			</div>

			<div className="border-edge border-l border-dashed p-4">
				<h2 className="text-balance font-medium leading-snug underline-offset-4 group-hover/post:underline">
					Générateur de couleurs (shadcn/ui)
				</h2>
			</div>

			<span className="relative flex items-center justify-center">
				<span className="absolute inline-flex size-3 animate-ping rounded-full bg-theme opacity-50" />
				<span className="relative inline-flex size-2 rounded-full bg-theme" />
				<span className="sr-only">Nouveau</span>
			</span>
		</Link>

		<Link
			aria-label="Encodeur / Décodeur Base64"
			className="group/post flex items-center border-edge border-b pr-4"
			href="/utils/base64"
		>
			<div
				aria-hidden
				className="mx-4 flex size-8 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
			>
				<TextTIcon className="pointer-events-none size-5 text-muted-foreground" />
			</div>

			<div className="border-edge border-l border-dashed p-4">
				<h2 className="text-balance font-medium leading-snug underline-offset-4 group-hover/post:underline">
					Encodeur / Décodeur Base64
				</h2>
			</div>

			<span className="relative flex items-center justify-center">
				<span className="absolute inline-flex size-3 animate-ping rounded-full bg-theme opacity-50" />
				<span className="relative inline-flex size-2 rounded-full bg-theme" />
				<span className="sr-only">Nouveau</span>
			</span>
		</Link>

		<div className="h-8" />
	</div>
);

export default UtilsPage;
