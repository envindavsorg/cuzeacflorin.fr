'use client';

import type { Player } from '@lordicon/react';
import { CopyrightIcon } from '@phosphor-icons/react/dist/ssr';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrambleText } from '@/components/animation/ScrambleText';
import { CurrentDate } from '@/components/elements/CurrentDate';
import HeartIcon from '@/components/lottie/heart.json' with { type: 'json' };
import { LordiconPlayer } from '@/components/lottie/LordiconPlayer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Paragraph } from '@/components/ui/Paragraph';
import { Separator } from '@/components/ui/Separator';
import { useBrowser } from '@/hooks/useBrowser';
import { getInitials } from '@/lib/utils';

type FooterProps = {
	firstName: string;
	lastName: string;
	city: string;
};

export const Footer = ({
	firstName,
	lastName,
	city,
}: FooterProps): React.JSX.Element => {
	const playerRef = useRef<Player>(null);
	const [ref, entry] = useIntersectionObserver({
		threshold: 0.1,
		rootMargin: '50px',
	});

	const fullName = useMemo(
		() => `${firstName} ${lastName}`,
		[firstName, lastName]
	);
	const initials = useMemo(() => getInitials(fullName), [fullName]);

	const isIntersecting = entry?.isIntersecting ?? false;

	useEffect(() => {
		if (isIntersecting) {
			playerRef.current?.playFromBeginning();
		}
	}, [isIntersecting]);

	// get last commit hash
	const commitHash = process.env.NEXT_PUBLIC_GIT_COMMIT || 'aucun commit';
	// get browser name and icon
	const { name, icon: Icon } = useBrowser();
	// current date
	const now = new Date();
	const currentDate = now.toLocaleDateString('fr-FR', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
	// window dimensions
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	});
	useEffect(() => {
		setDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		});

		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	const dimensionsText = `${dimensions.width}x${dimensions.height}`;
	// latest date update
	const date = process.env.NEXT_PUBLIC_GIT_COMMIT_DATE || 'aucune mise à jour';
	const commitDate = new Date(date).toLocaleDateString();
	const isToday = new Date().toLocaleDateString();

	return (
		<footer className="space-y-6 pt-3 pb-6" ref={ref}>
			<Separator />

			<div className="flex flex-col gap-y-3">
				<h2 className="font-bold text-base">Metadata :</h2>
				<div className="grid grid-cols-4 gap-3 md:grid-cols-3 lg:grid-cols-5">
					<div className="flex flex-col gap-y-1 max-md:col-span-2">
						<span className="font-medium text-sm">Dernier commit :</span>
						<ScrambleText
							className="text-muted-foreground italic"
							text={commitHash}
							trigger={isIntersecting}
						/>
					</div>
					<div className="flex flex-col gap-y-1 max-md:col-span-2">
						<span className="font-medium text-sm">Navigateur :</span>
						<div className="flex items-center gap-2">
							{Icon && <Icon className="size-4" />}
							<ScrambleText
								className="text-muted-foreground italic"
								text={name}
								trigger={isIntersecting}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-y-1 max-md:col-span-full">
						<span className="font-medium text-sm">Date actuelle :</span>
						<ScrambleText
							className="text-muted-foreground italic"
							text={currentDate}
							trigger={isIntersecting}
						/>
					</div>
					<div className="flex flex-col gap-y-1 max-md:col-span-full">
						<span className="font-medium text-sm">
							Résolution{' '}
							<span className="min-md:hidden">de votre appareil</span> :
						</span>
						<ScrambleText
							className="text-muted-foreground italic"
							text={dimensionsText}
							trigger={isIntersecting}
						/>
					</div>
					<div className="flex flex-col gap-y-1 max-md:col-span-full">
						<span className="font-medium text-sm max-md:hidden">
							Mise à jour :
						</span>
						<span className="font-medium text-sm min-md:hidden">
							Dernière mise à jour publiée :
						</span>
						<ScrambleText
							className="text-muted-foreground italic"
							text={
								commitDate === isToday
									? `Aujourd'hui à ${new Date(date).toLocaleTimeString(
											'fr-FR',
											{
												hour: '2-digit',
												minute: '2-digit',
											}
										)}`
									: new Date(date)
											.toLocaleDateString('fr-FR', {
												weekday: 'short',
												day: 'numeric',
												month: 'short',
												hour: 'numeric',
												minute: 'numeric',
											})
											.replace(',', ' à')
							}
							trigger={isIntersecting}
						/>
					</div>
				</div>
			</div>

			<Separator />

			<div className="flex items-center justify-start gap-x-4">
				<Avatar className="size-10">
					<AvatarImage alt={fullName} src="/avatar.webp" />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div className="*:!font-medium flex flex-col *:flex *:items-center *:gap-x-1">
					<div className="*:!text-sm *:!text-foreground">
						<CopyrightIcon className="size-4 pt-0.5" />{' '}
						<CurrentDate format="yearly" />{' '}
						<Paragraph className="ms-1 leading-relaxed">{fullName}</Paragraph>
					</div>
					<div className="*:!text-xs *:!italic">
						<Paragraph className="leading-relaxed">
							Developpé avec beaucoup d'
						</Paragraph>
						<LordiconPlayer
							colorize="light-dark(var(--color-red-600), var(--color-red-300))"
							icon={HeartIcon}
							ref={playerRef}
						/>
						<Paragraph className="leading-relaxed">à {city}.</Paragraph>
					</div>
				</div>
			</div>
		</footer>
	);
};
