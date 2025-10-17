import type React from 'react';
import {
	Marquee,
	MarqueeContent,
	MarqueeFade,
	MarqueeItem,
} from '@/components/ui/Marquee';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Prose } from '@/components/ui/Typography';
import { type Stack, techStack } from '@/features/root/data/tech-stack';
import { cn } from '@/lib/utils';

const stackIcons: React.JSX.Element[] = techStack.map(
	({ icon: Icon, title }: Stack, index) => (
		<MarqueeItem key={`${title}-${index + 1}`}>
			<div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background">
				<Icon className="size-6 shrink-0" />
				<p className="sr-only">{title}</p>
			</div>
		</MarqueeItem>
	)
);

export const TechStack = (): React.JSX.Element => (
	<Panel id="stack">
		<PanelHeader>
			<PanelTitle>Ma stack technique</PanelTitle>
		</PanelHeader>

		<PanelContent className="screen-line-after py-2">
			<Prose className="text-muted-foreground">
				Mon expertise se concentre sur l'écosystème JavaScript moderne. Au
				quotidien, je développe avec React, Next.js et TypeScript, en utilisant
				Tailwind CSS pour le styling et Framer Motion pour les animations. Côté
				back-end, je travaille avec Node.js et des frameworks comme Express ou
				Fastify, connectés à MongoDB ou PostgreSQL. Je maîtrise l'ensemble de la
				chaîne de développement, de la conception sur Figma au déploiement, en
				passant par Git pour le versioning.
			</Prose>
		</PanelContent>

		<PanelContent
			className={cn(
				'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5',
				'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-center bg-size-[10px_10px]',
				'bg-zinc-950/0.75 dark:bg-white/0.75'
			)}
		>
			<div className="flex flex-col gap-y-4">
				<Marquee>
					<MarqueeFade side="left" />
					<MarqueeFade side="right" />
					<MarqueeContent direction="left">{stackIcons}</MarqueeContent>
				</Marquee>
				<Marquee>
					<MarqueeFade side="left" />
					<MarqueeFade side="right" />
					<MarqueeContent direction="right">{stackIcons}</MarqueeContent>
				</Marquee>
			</div>
		</PanelContent>
	</Panel>
);
