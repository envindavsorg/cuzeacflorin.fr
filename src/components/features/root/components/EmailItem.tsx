'use client';

import { EnvelopeIcon } from '@phosphor-icons/react';
import type React from 'react';
import { OverviewItem } from '@/components/features/root/elements/overview/OverviewItem';
import useIsClient from '@/hooks/use-is-client';
import { decodeEmail } from '@/utils/string';

type EmailItemProps = {
	email: string;
	className?: string;
};

export const EmailItem = ({
	email,
	className,
}: EmailItemProps): React.JSX.Element => {
	const isClient = useIsClient();
	const emailDecoded = decodeEmail(email);

	return (
		<OverviewItem
			className={className}
			content={isClient ? emailDecoded : '[email masqué]'}
			href={isClient ? `mailto:${emailDecoded}` : '#'}
			icon={EnvelopeIcon}
		/>
	);
};
