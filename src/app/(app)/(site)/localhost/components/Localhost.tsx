'use client';

import { useMemo } from 'react';
import { Divider } from '@/components/ui/Divider';
import { usePortStatus } from '@/hooks/use-port-status';
import { INITIAL_FAVORITE_PORTS } from '../constants';
import { FavoritePorts } from './FavoritePorts';
import { SearchSection } from './SearchSection';

export const Localhost = () => {
	const portNumbers = useMemo(
		() => INITIAL_FAVORITE_PORTS.map((port) => port.number),
		[INITIAL_FAVORITE_PORTS],
	);

	const { portStatus } = usePortStatus(portNumbers, {
		interval: 30_000,
		timeout: 3000,
		enabled: portNumbers.length > 0,
	});

	const portsWithStatus = useMemo(
		() =>
			INITIAL_FAVORITE_PORTS.map((port) => ({
				...port,
				isActive: portStatus[port.number],
			})),
		[INITIAL_FAVORITE_PORTS, portStatus],
	);

	return (
		<>
			<SearchSection />
			<Divider className="!border-x-0" />
			<FavoritePorts ports={portsWithStatus} />
		</>
	);
};
