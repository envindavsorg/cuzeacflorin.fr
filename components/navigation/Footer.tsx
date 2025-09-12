'use client';

import type { Player } from '@lordicon/react';
import {
	EnvelopeIcon,
	GithubLogoIcon,
	type Icon,
	LinkedinLogoIcon,
	PhoneIcon,
} from '@phosphor-icons/react';
import { CopyrightIcon } from '@phosphor-icons/react/dist/ssr';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { CurrentDate } from '@/components/elements/CurrentDate';
import HeartIcon from '@/components/lottie/heart.json' with { type: 'json' };
import { LordiconPlayer } from '@/components/lottie/LordiconPlayer';
import { Metadata } from '@/components/navigation/Metadata';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Paragraph } from '@/components/ui/Paragraph';
import { Separator } from '@/components/ui/Separator';
import { getInitials } from '@/lib/utils';

type Social = {
	name: string;
	url: string;
	icon: Icon;
};

const social: Social[] = [
	{
		name: 'Github',
		url: 'https://github.com/envindavsorg/',
		icon: GithubLogoIcon,
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/cuzeacflorin/',
		icon: LinkedinLogoIcon,
	},
	{
		name: 'Téléphone',
		url: 'tel:+33658058665',
		icon: PhoneIcon,
	},
	{
		name: 'E-mail',
		url: 'mailto:mail@cuzeacflorin.fr',
		icon: EnvelopeIcon,
	},
];

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

	const MotionLink = motion.create(Link);

	return (
		<footer className="pt-3 pb-6 sm:space-y-6" ref={ref}>
			<Separator />

			<Metadata intersect={isIntersecting} />

			<Separator />

			<div className="flex max-md:flex-col-reverse max-md:gap-y-6 min-md:items-center min-md:justify-between">
				<div className="flex items-center gap-x-6 md:gap-x-4">
					<Avatar className="size-10">
						<AvatarImage alt={fullName} src="/avatar.webp" />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className="*:!font-medium flex flex-col *:flex *:items-center">
						<div className="*:!text-sm *:!text-foreground gap-x-1 *:font-semibold">
							<CopyrightIcon className="size-4 pt-0.5" />{' '}
							<CurrentDate format="yearly" /> -{' '}
							<Paragraph className="leading-relaxed">{fullName}</Paragraph>
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
								à {city}.
							</Paragraph>
						</div>
					</div>
				</div>

				<Separator className="min-md:hidden" />

				<div className="items-center gap-x-6 max-md:grid max-md:grid-cols-4 min-md:flex">
					{social.map(({ name, url, icon: Icon }) => (
						<MotionLink
							aria-label={name}
							className="group max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-y-2"
							href={url}
							key={name}
							rel="noreferrer"
							target="_blank"
							whileHover={{ scale: 1.15 }}
							whileTap={{ scale: 0.95 }}
						>
							<Icon className="size-8 shrink-0 transition-all duration-300 group-hover:text-theme" />
							<span className="font-medium text-muted-foreground text-xs italic group-hover:text-theme min-md:sr-only">
								{name}
							</span>
						</MotionLink>
					))}
				</div>
			</div>
		</footer>
	);
};
