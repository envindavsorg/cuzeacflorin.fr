'use client';

import { ArrowRightIcon } from '@phosphor-icons/react';
import { EnvelopeIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { memo } from 'react';
import useSWR from 'swr';
import type { CvMetadata } from '@/app/api/cv/route';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { Spinner } from '@/components/ui/Spinner';
import { GridItem } from '@/components/widgets/GridItem';
import { fetcher } from '@/lib/fetcher';
import { PROFILE_CONFIG } from '@/resources/profile';

const {
	contact: { title, description, email, phone },
} = PROFILE_CONFIG;

export const ContactMe = memo((): React.JSX.Element => {
	const { data, isLoading } = useSWR<CvMetadata>('/api/cv', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		keepPreviousData: true,
	});

	return (
		<GridItem aria={title} link={email.url} slug="contact-me-widget">
			<Card className="flex h-full flex-col justify-center p-4">
				<h3 className="font-semibold text-base tracking-tight group-hover:text-theme sm:text-lg">
					{title}
				</h3>

				<Paragraph className="!text-xs sm:!text-sm mt-2 line-clamp-3 text-muted-foreground sm:mt-3">
					{description}
				</Paragraph>

				<div className="mt-2 flex-1">
					{isLoading && (
						<div className="flex items-center gap-x-1.5 py-1">
							<Spinner
								className="size-4 text-muted-foreground"
								variant="default"
							/>
							<span className="text-muted-foreground text-xs italic">
								chargement ...
							</span>
						</div>
					)}
					{data && (
						<div className="flex flex-wrap gap-1.5">
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{email.value}
							</div>
							<div className="rounded-sm bg-muted/50 px-2 py-1 text-muted-foreground text-xs shadow-elevation-light">
								{phone.value}
							</div>
						</div>
					)}
				</div>

				<div className="mt-3 flex items-center justify-between gap-3">
					<div className="flex items-center gap-x-3">
						<EnvelopeIcon className="size-5 shrink-0" />
						<PhoneIcon className="size-5 shrink-0" />
					</div>
					<div className="flex items-center gap-x-1 *:text-muted-foreground">
						<span className="text-xs group-hover:text-theme sm:text-sm">
							Me contacter
						</span>
						<ArrowRightIcon className="group-hover:-rotate-45 text-sm transition duration-200 group-hover:text-theme sm:text-base" />
					</div>
				</div>
			</Card>
		</GridItem>
	);
});
