'use client';

import type { Player } from '@lordicon/react';
import { CopyrightIcon } from '@phosphor-icons/react/dist/ssr';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { CurrentDate } from '@/components/elements/CurrentDate';
import HeartIcon from '@/components/lottie/heart.json' with { type: 'json' };
import { LordiconPlayer } from '@/components/lottie/LordiconPlayer';
import { Metadata } from '@/components/navigation/metadata/Metadata';
import { Social } from '@/components/navigation/Social';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Paragraph } from '@/components/ui/Paragraph';
import { Separator } from '@/components/ui/Separator';
import useIsMounted from '@/hooks/useIsMounted';
import { getInitials } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName, location } = PROFILE_CONFIG;

export const Footer = (): React.JSX.Element => {
	const isMounted = useIsMounted();
	const playerRef = useRef<Player>(null);
	const [ref, entry] = useIntersectionObserver({
		threshold: 0.1,
		rootMargin: '20px',
	});

	const initials: string = getInitials(`${firstName} ${lastName}`);
	const isIntersecting: boolean = entry?.isIntersecting ?? false;

	useEffect(() => {
		if (isIntersecting) {
			playerRef.current?.playFromBeginning();
		}
	}, [isIntersecting]);

	return (
		<footer className="w-full max-w-7xl space-y-6 py-6" ref={ref}>
			<Metadata intersect={isIntersecting} />

			<Separator />

			<div className="flex max-md:flex-col-reverse max-md:gap-y-6 min-md:items-center min-md:justify-between">
				<div className="flex items-center gap-x-6 md:gap-x-4">
					{isMounted && (
						<Avatar className="size-10">
							<AvatarImage
								alt={`${firstName} ${lastName}`}
								src="/avatar.webp"
							/>
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
					)}
					<div className="*:!font-medium flex flex-col *:flex *:items-center">
						<div className="*:!text-sm *:!text-foreground gap-x-1 *:font-semibold">
							<CopyrightIcon className="size-4 pt-0.5" />{' '}
							<CurrentDate format="yearly" /> -{' '}
							<Paragraph className="leading-relaxed">
								{firstName} {lastName}
							</Paragraph>
						</div>
						<div className="*:!text-xs *:!italic">
							<Paragraph className="leading-relaxed">
								Développé avec beaucoup d'
							</Paragraph>
							<LordiconPlayer
								colorize="light-dark(var(--color-red-600), var(--color-red-300))"
								icon={HeartIcon}
								ref={playerRef}
							/>
							<Paragraph className="pl-0.5 leading-relaxed">
								à {location.city}.
							</Paragraph>
						</div>
					</div>
				</div>

				<Separator className="min-md:hidden" />

				<Social />
			</div>
		</footer>
	);
};
