'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { Card, CardLink } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const {
	contact: { title, description, email, social },
} = PROFILE_CONFIG;

export const ContactMe = memo((): React.JSX.Element => {
	const MotionLink = motion.create(Link);

	return (
		<Card
			className={cn(
				'h-full px-6 py-5 md:py-6 lg:px-8 lg:py-8',
				'flex items-center justify-center'
			)}
		>
			<CardLink
				className="absolute top-5 right-5"
				label="N'hésitez pas à me contacter !"
				url={`mailto:${email}`}
			/>

			<div className="flex flex-col items-start justify-between gap-y-6 md:gap-y-3">
				<h2
					className="inline-block font-bold font-pixelify-sans text-3xl text-theme"
					title={title}
				>
					{title}
				</h2>
				<Paragraph className="relative line-clamp-3 leading-relaxed max-sm:line-clamp-2 md:line-clamp-6 lg:line-clamp-4">
					{description}
				</Paragraph>
				<div className="mt-3 inline-flex gap-x-6">
					{social.map(({ name, url, icon: Icon }) => (
						<MotionLink
							aria-label={name}
							className="group"
							href={url}
							key={name}
							rel="noreferrer"
							target="_blank"
							whileHover={{ scale: 1.15 }}
							whileTap={{ scale: 0.95 }}
						>
							<Icon className="size-10 transition-all duration-300 group-hover:text-theme lg:size-8" />
							<span className="sr-only">{name}</span>
						</MotionLink>
					))}
				</div>
			</div>
		</Card>
	);
});
