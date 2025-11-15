// Hook personnalisé pour vérifier le statut des ports.
import { useCallback, useEffect, useState } from 'react';

export type PortStatus = {
	[port: number]: boolean;
};

type UsePortStatusOptions = {
	interval?: number;
	timeout?: number;
	enabled?: boolean;
};

// vérifie si chaque port est actif via une requête HEAD HTTP.
export const usePortStatus = (
	ports: number[],
	options: UsePortStatusOptions = {},
) => {
	const { interval = 30_000, timeout = 3000, enabled = true } = options;

	const [portStatus, setPortStatus] = useState<PortStatus>({});
	const [isChecking, setIsChecking] = useState(false);
	const [lastChecked, setLastChecked] = useState<Date | null>(null);

	// vérifie si un port spécifique est actif ou non.
	const checkPortStatus = useCallback(
		async (port: number): Promise<boolean> => {
			try {
				const controller: AbortController = new AbortController();
				const timeoutId: NodeJS.Timeout = setTimeout(
					() => controller.abort(),
					timeout,
				);

				await fetch(`http://localhost:${port}`, {
					method: 'HEAD',
					signal: controller.signal,
					mode: 'no-cors',
				});

				clearTimeout(timeoutId);

				return true;
			} catch (_error) {
				return false;
			}
		},
		[timeout],
	);

	// vérifie le statut de tous les ports.
	const checkAllPorts = useCallback(async () => {
		if (!enabled || ports.length === 0) {
			return;
		}

		setIsChecking(true);
		const newStatus: PortStatus = {};

		const promises = ports.map(async (port: number) => {
			newStatus[port] = await checkPortStatus(port);
		});

		await Promise.all(promises);

		setPortStatus(newStatus);
		setLastChecked(new Date());
		setIsChecking(false);
	}, [ports, enabled, checkPortStatus]);

	// force une vérification immédiate.
	const forceCheck = useCallback(() => {
		checkAllPorts();
	}, [checkAllPorts]);

	useEffect(() => {
		if (enabled && ports.length > 0) {
			checkAllPorts();
		}
	}, [ports, enabled, checkAllPorts]);

	useEffect(() => {
		if (!enabled || interval <= 0) {
			return;
		}

		const intervalId = setInterval(checkAllPorts, interval);
		return () => clearInterval(intervalId);
	}, [checkAllPorts, interval, enabled]);

	return {
		portStatus,
		isChecking,
		lastChecked,
		forceCheck,
		checkPort: checkPortStatus,
	};
};
