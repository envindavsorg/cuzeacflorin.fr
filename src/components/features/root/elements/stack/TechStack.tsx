import type React from 'react';
import {
	type Stack,
	techStack,
} from '@/components/features/root/data/tech-stack';
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

		<PanelContent className="screen-line-after">
			<Prose className="text-muted-foreground">
				Mon expertise se concentre sur l'écosystème{' '}
				<span className="font-medium text-foreground">JavaScript</span> moderne.
				Au quotidien, je développe avec{' '}
				<span className="font-medium text-foreground">React</span>,{' '}
				<span className="font-medium text-foreground">Next.js</span> et{' '}
				<span className="font-medium text-foreground">TypeScript</span>, en
				utilisant{' '}
				<span className="font-medium text-foreground">Tailwind CSS</span> pour
				le styling et{' '}
				<span className="font-medium text-foreground">Motion</span> pour les
				animations. Côté back-end, je travaille avec{' '}
				<span className="font-medium text-foreground">Node.js</span> et des
				frameworks comme{' '}
				<span className="font-medium text-foreground">Express</span> ou{' '}
				<span className="font-medium text-foreground">Fastify</span>, connectés
				à <span className="font-medium text-foreground">MongoDB</span> ou{' '}
				<span className="font-medium text-foreground">PostgreSQL</span>. Je
				maîtrise l'ensemble de la chaîne de développement, de la conception sur{' '}
				<span className="font-medium text-foreground">Figma</span> au
				déploiement, en passant par{' '}
				<span className="font-medium text-foreground">Git</span> pour le
				versioning.
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
