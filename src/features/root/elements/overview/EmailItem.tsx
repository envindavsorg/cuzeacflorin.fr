'use client';

import { EnvelopeIcon } from '@phosphor-icons/react';
import type React from 'react';
import { IntroItem } from '@/features/root/elements/overview/IntroItem';
import useIsClient from '@/hooks/use-is-client';
import { decodeEmail } from '@/utils/string';

type EmailItemProps = {
	email: string;
};

const EmailItem = ({ email }: EmailItemProps): React.JSX.Element => {
	const isClient = useIsClient();
	const emailDecoded = decodeEmail(email);

	return (
		<IntroItem
			content={isClient ? emailDecoded : '[email masqué]'}
			href={isClient ? `mailto:${emailDecoded}` : '#'}
			icon={EnvelopeIcon}
		/>
	);
};

EmailItem.displayName = 'EmailItem';

export { EmailItem };
