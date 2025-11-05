'use client';

import { EnvelopeIcon } from '@phosphor-icons/react';
import { useIsClient } from '@uidotdev/usehooks';
import type React from 'react';
import { decodeEmail } from '@/utils/string';
import { OverviewItem } from './OverviewItem';

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
