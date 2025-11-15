'use client';

import { PhoneIcon } from '@phosphor-icons/react';
import { useIsClient } from '@uidotdev/usehooks';
import { decodePhoneNumber, formatPhoneNumber } from '@/utils/string';
import { OverviewItem } from './OverviewItem';

type PhoneItemProps = {
	phoneNumber: string;
	className?: string;
};

export const PhoneItem = ({ phoneNumber }: PhoneItemProps) => {
	const isClient = useIsClient();
	const phoneNumberDecoded = decodePhoneNumber(phoneNumber);

	return (
		<OverviewItem
			content={
				isClient
					? formatPhoneNumber(phoneNumberDecoded)
					: '[numéro masqué]'
			}
			href={isClient ? `tel:${phoneNumberDecoded}` : '#'}
			icon={PhoneIcon}
		/>
	);
};
