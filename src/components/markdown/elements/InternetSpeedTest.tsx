'use client';

import SpeedTestEngine from '@cloudflare/speedtest';
import { useCallback, useRef, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type TestState = {
	status: 'idle' | 'running' | 'finished';
	result: SpeedResult;
};

type SpeedResult = ReturnType<
	typeof SpeedTestEngine.prototype.results.getSummary
>;

const createSpeedTestEngine = () => {
	return new SpeedTestEngine({
		autoStart: false,
		measurements: [
			// Quick latency check (1-2 seconds)
			{ type: 'latency', numPackets: 5 },
			// Download test (4-5 seconds)
			{ type: 'download', bytes: 1e6, count: 2, bypassMinDuration: true },
			{ type: 'download', bytes: 1e7, count: 1, bypassMinDuration: true },
			// Upload test (4-5 seconds)
			{ type: 'upload', bytes: 1e6, count: 2, bypassMinDuration: true },
			{ type: 'upload', bytes: 1e7, count: 1, bypassMinDuration: true },
		],
	});
};

const outlineStyles =
	'outline outline-1 outline-green-600 dark:outline-green-300 outline-offset-1 shadow-md transition';

export default function InternetSpeedTest() {
	const [testState, setTestState] = useState<TestState>({
		status: 'idle',
		result: {} as SpeedResult,
	});

	const engineRef = useRef<SpeedTestEngine | null>(null);

	const toggleTest = useCallback(async () => {
		if (testState.status === 'running') {
			engineRef.current?.pause?.();
			engineRef.current = null;
			setTestState({ status: 'idle', result: {} });
			return;
		}

		setTestState({ status: 'running', result: {} });
		const speedTest = createSpeedTestEngine();
		engineRef.current = speedTest;

		speedTest.onResultsChange = () => {
			if (engineRef.current !== speedTest) {
				return;
			}

			setTestState((prev) => ({
				...prev,
				result: speedTest.results.getSummary(),
			}));
		};

		speedTest.onFinish = (final: { getSummary: () => any }) => {
			if (engineRef.current !== speedTest) {
				return;
			}

			setTestState({ status: 'finished', result: final.getSummary() });
			engineRef.current = null;
		};

		speedTest.onError = () => {
			if (engineRef.current !== speedTest) {
				return;
			}

			engineRef.current = null;
			setTestState({ status: 'idle', result: {} });
		};

		speedTest.play();
	}, [testState.status]);

	return (
		<div className="grid auto-rows-[180px] gap-6 py-6 md:grid-cols-4">
			<Card
				className={cn(
					'relative row-span-1 flex flex-col p-6 transition-shadow md:col-span-2',
					testState.status === 'finished' && outlineStyles
				)}
			>
				<Label
					isRunning={testState.status === 'running'}
					title="Téléchargement"
				/>

				<div className="flex flex-1 flex-col justify-end">
					<div className="font-semibold text-5xl tabular-nums leading-none">
						{((testState.result.download || 0) / 1_000_000).toFixed(2)}
						<span className="ml-2 font-normal text-base text-muted-foreground">
							Mbps
						</span>
					</div>
				</div>
			</Card>

			<Card
				className={cn(
					'relative row-span-1 flex flex-col p-6 transition-shadow md:col-span-2',
					testState.status === 'finished' && outlineStyles
				)}
			>
				<Label
					isRunning={testState.status === 'running'}
					title="Téléversement"
				/>

				<div className="flex flex-1 flex-col justify-end">
					<div className="font-semibold text-5xl tabular-nums leading-none">
						{((testState.result.upload || 0) / 1_000_000).toFixed(2)}
						<span className="ml-2 font-normal text-base text-muted-foreground">
							Mbps
						</span>
					</div>
				</div>
			</Card>

			<Card
				className={cn(
					'row-span-1 flex flex-col p-6 transition-shadow md:col-span-1',
					testState.status === 'finished' && outlineStyles
				)}
			>
				<Label isRunning={testState.status === 'running'} title="Latence" />

				<div className="flex flex-1 flex-col justify-end">
					<div className="font-semibold text-4xl tabular-nums leading-none">
						{(testState.result.latency || 0).toFixed(0)}
						<span className="ml-2 font-normal text-base text-muted-foreground">
							ms
						</span>
					</div>
				</div>
			</Card>
			<Card
				className={cn(
					'row-span-1 flex flex-col p-6 transition-shadow md:col-span-1',
					testState.status === 'finished' && outlineStyles
				)}
			>
				<Label isRunning={testState.status === 'running'} title="Gigue" />

				<div className="flex flex-1 flex-col justify-end">
					<div className="font-semibold text-4xl tabular-nums leading-none">
						{(testState.result.jitter || 0).toFixed(1)}
						<span className="ml-2 font-normal text-base text-muted-foreground">
							ms
						</span>
					</div>
				</div>
			</Card>

			<Card
				className="group row-span-1 flex cursor-pointer select-none flex-col border-none bg-foreground md:col-span-2"
				onClick={toggleTest}
				onKeyDown={(event: { key: string; preventDefault: () => void }) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						toggleTest();
					}
				}}
				role="button"
				tabIndex={0}
			>
				<div className="flex flex-1 items-center justify-center">
					<div className="font-semibold text-4xl text-background tracking-tight">
						{getButtonLabel(testState.status)}
					</div>
				</div>
			</Card>
		</div>
	);
}

type LabelProps = {
	isRunning: boolean;
	title: string;
};

const Label = (props: LabelProps) => (
	<div className="flex items-center gap-x-2">
		<h4 className="mt-0 font-medium text-muted-foreground">{props.title}</h4>
		{props.isRunning && <PulsatingCircle />}
	</div>
);

const PulsatingCircle = () => (
	<span className="relative flex items-center justify-center pb-2">
		<span className="absolute inline-flex size-3 animate-ping rounded-full bg-theme opacity-50" />
		<span className="relative inline-flex size-2 rounded-full bg-theme" />
	</span>
);

const getButtonLabel = (status: TestState['status']) => {
	switch (status) {
		case 'idle':
			return 'DÉMARRER';
		case 'running':
			return 'ARRÊTER';
		case 'finished':
			return 'RECOMMENCER';
		default:
			return 'DÉMARRER';
	}
};
