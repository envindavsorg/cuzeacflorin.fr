'use client';

import type { Player } from '@lordicon/react';
import type { StatusResponse } from '@openstatus/react';
import {
	CloudCheckIcon,
	CloudIcon,
	CloudSlashIcon,
	CloudWarningIcon,
	CloudXIcon,
	TriangleDashedIcon,
	TriangleIcon,
} from '@phosphor-icons/react';
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { PizzaIcon } from '@/components/icons/Pizza';
import { Divider } from '@/components/ui/Divider';
import { Panel } from '@/components/ui/Panel';
import { cn } from '@/lib/utils';
import { Metadata } from './Metadata';

type FooterProps = {
	commit?: {
		branch: string | undefined;
		hash: string | undefined;
		update: string | undefined;
	};
	status: StatusResponse;
};

const Footer = ({ commit, status }: FooterProps): React.JSX.Element => {
	const playerHeartRef = useRef<Player>(null);
	const playerPizzaRef = useRef<Player>(null);
	const [ref, entry] = useIntersectionObserver({
		threshold: 0.1,
		rootMargin: '20px',
	});

	const isIntersecting: boolean = entry?.isIntersecting ?? false;

	useEffect(() => {
		if (isIntersecting) {
			playerHeartRef.current?.playFromBeginning();
			playerPizzaRef.current?.playFromBeginning();
		}
	}, [isIntersecting]);

	const statusConfig = {
		operational: {
			label: 'Opérationnel',
			color: 'bg-green-600 dark:bg-green-300',
			icon: CloudCheckIcon,
			iconColor: 'text-green-600 dark:text-green-300',
		},
		degraded_performance: {
			label: 'Performance dégradée',
			color: 'bg-yellow-600 dark:bg-yellow-300',
			icon: CloudWarningIcon,
			iconColor: 'text-yellow-600 dark:text-yellow-300',
		},
		partial_outage: {
			label: 'Panne partielle',
			color: 'bg-orange-600 dark:bg-orange-300',
			icon: CloudWarningIcon,
			iconColor: 'text-orange-600 dark:text-orange-300',
		},
		major_outage: {
			label: 'Panne majeure',
			color: 'bg-red-600 dark:bg-red-300',
			icon: CloudXIcon,
			iconColor: 'text-red-600 dark:text-red-300',
		},
		under_maintenance: {
			label: 'Maintenance',
			color: 'bg-blue-600 dark:bg-blue-300',
			icon: CloudSlashIcon,
			iconColor: 'text-blue-600 dark:text-blue-300',
		},
		incident: {
			label: 'Incident',
			color: 'bg-red-600 dark:bg-red-300',
			icon: CloudWarningIcon,
			iconColor: 'text-red-600 dark:text-red-300',
		},
		unknown: {
			label: 'Statut inconnu',
			color: 'bg-gray-600 dark:bg-gray-300',
			icon: CloudIcon,
			iconColor: 'text-gray-600 dark:text-gray-300',
		},
	};

	const currentStatus = statusConfig[status.status] || statusConfig.unknown;
	const StatusIcon = currentStatus.icon || CloudIcon;

	return (
		<>
			<div className="max-w-screen overflow-x-hidden px-2">
				<div className="mx-auto md:max-w-3xl">
					<Metadata commit={commit} />
					<Divider />
					<Panel>
						<div
							className={cn(
								'flex items-center justify-between',
								'screen-line-before w-full px-4 py-3'
							)}
						>
							<div className="flex items-center gap-x-3">
								<div className="flex items-center gap-x-1.5">
									<StatusIcon
										className={cn('size-5', currentStatus.iconColor)}
									/>
									<p className="font-medium text-sm">{currentStatus.label}</p>
								</div>
								<span className="relative flex items-center justify-center">
									<span
										className={cn(
											'absolute inline-flex size-3 animate-ping rounded-full opacity-50',
											currentStatus.color
										)}
									/>
									<span
										className={cn(
											'relative inline-flex size-2 rounded-full',
											currentStatus.color
										)}
									/>
								</span>
							</div>
							<Link
								aria-label="Voir le statut complet"
								className="flex items-center gap-x-2"
								href={`https://${process.env.OPENSTATUS_SLUG || 'cuzeacflorin-fr'}.openstatus.dev/`}
								rel="noopener noreferrer"
								target="_blank"
							>
								<p className="font-medium text-sm">Détails</p>
								<ArrowUpRightIcon className="size-3" />
							</Link>
						</div>
					</Panel>
					<Divider />
				</div>
			</div>

			<footer className="max-w-screen overflow-x-hidden px-2" ref={ref}>
				<div className="screen-line-before mx-auto border-edge border-x pt-4 md:max-w-3xl">
					<div className="mb-4 flex flex-col items-center justify-center gap-3 px-4">
						<div className="flex items-center gap-x-1">
							<div className="flex items-center">
								<p className="text-balance font-mono text-muted-foreground text-xs sm:text-sm">
									Développé avec beaucoup d'
								</p>
								<HeartIcon ref={playerHeartRef} state="hover-pinch" />
							</div>
							<p className="text-balance font-mono text-muted-foreground text-xs sm:text-sm">
								et de
							</p>
							<PizzaIcon ref={playerPizzaRef} state="hover-pizza" />
							<p className="text-balance font-mono text-muted-foreground text-xs sm:text-sm">
								à Paris.
							</p>
						</div>
					</div>

					<div
						className={cn(
							'screen-line-before screen-line-after flex w-full before:z-1 after:z-1',
							'bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]',
							'bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56'
						)}
					>
						<div className="mx-auto flex items-center justify-center gap-3 border-edge border-x bg-background px-4">
							<Link
								aria-label="LLM"
								className="flex items-center gap-x-1.5 text-muted-foreground transition-colors hover:text-foreground"
								href="/llms.txt"
								rel="noopener noreferrer"
								target="_blank"
							>
								<TriangleDashedIcon className="size-5" />
								<span className="text-balance font-mono text-muted-foreground text-xs sm:text-sm">
									Contexte essentiel
								</span>
							</Link>

							<div className="flex h-11 w-px bg-edge" />
							<div className="flex h-11 w-px bg-edge" />

							<Link
								aria-label="LLM"
								className="flex items-center gap-x-1.5 text-muted-foreground transition-colors hover:text-foreground"
								href="/llms-full.txt"
								rel="noopener noreferrer"
								target="_blank"
							>
								<TriangleIcon className="size-5" />
								<span className="text-balance font-mono text-muted-foreground text-xs sm:text-sm">
									Contexte intégral
								</span>
							</Link>
						</div>
					</div>
				</div>

				<div className="pb-[env(safe-area-inset-bottom,0px)]">
					<div className="flex h-2" />
				</div>
			</footer>
		</>
	);
};

export { Footer };
