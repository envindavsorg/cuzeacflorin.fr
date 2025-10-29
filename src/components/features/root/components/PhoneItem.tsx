'use client';

import { PhoneIcon } from '@phosphor-icons/react';
import type React from 'react';
import { OverviewItem } from '@/components/features/root/elements/overview/OverviewItem';
import useIsClient from '@/hooks/use-is-client';
import { decodePhoneNumber, formatPhoneNumber } from '@/utils/string';

type PhoneItemProps = {
	phoneNumber: string;
	className?: string;
};

export const PhoneItem = ({
	phoneNumber,
}: PhoneItemProps): React.JSX.Element => {
	const isClient = useIsClient();
	const phoneNumberDecoded = decodePhoneNumber(phoneNumber);

	return (
		<OverviewItem
			content={
				isClient ? formatPhoneNumber(phoneNumberDecoded) : '[numéro masqué]'
			}
			href={isClient ? `tel:${phoneNumberDecoded}` : '#'}
			icon={PhoneIcon}
		/>
	);
};
