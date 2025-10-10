'use client';

import { PhoneIcon } from '@phosphor-icons/react';
import { IntroItem } from './IntroItem';
import useIsClient from '../../../../hooks/use-is-client';
import { decodePhoneNumber, formatPhoneNumber } from '../../../../utils/string';

const PhoneItem = ({ phoneNumber }: { phoneNumber: string }) => {
	const isClient = useIsClient();
	const phoneNumberDecoded = decodePhoneNumber(phoneNumber);

	return (
		<IntroItem
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
