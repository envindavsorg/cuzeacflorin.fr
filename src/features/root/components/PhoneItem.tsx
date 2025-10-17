'use client';

import { PhoneIcon } from '@phosphor-icons/react';
import { OverviewItem } from '@/features/root/elements/OverviewItem';
import useIsClient from '@/hooks/use-is-client';
import { decodePhoneNumber, formatPhoneNumber } from '@/utils/string';

const PhoneItem = ({ phoneNumber }: { phoneNumber: string }) => {
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

PhoneItem.displayName = 'PhoneItem';

export { PhoneItem };
