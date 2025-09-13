import type { Icon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { PROFILE_CONFIG } from '@/resources/profile';

const {
	linkedin,
	github,
	contact: { email, phone },
} = PROFILE_CONFIG;

type Social = {
	name: string;
	url: string;
	icon: Icon;
};

const social: Social[] = [linkedin, github, phone, email];

export const Social = (): React.JSX.Element => {
	const MotionLink = motion.create(Link);

	return (
		<div className="items-center gap-x-6 max-md:grid max-md:grid-cols-4 min-md:flex">
			{social.map(({ name, url, icon: Icon }) => (
				<MotionLink
					aria-label={name}
					className="group flex flex-col items-center justify-center gap-2 sm:flex-row"
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
	);
};
