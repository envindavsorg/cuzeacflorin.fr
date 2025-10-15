'use client';

import SpeedTestEngine from '@cloudflare/speedtest';
import {
	DownloadIcon,
	GaugeIcon,
	SpeedometerIcon,
	UploadIcon,
} from '@phosphor-icons/react';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
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

type PulsatingCircleProps = {
	isRunning: boolean;
	isFinished: boolean;
};

const PulsatingCircle = (props: PulsatingCircleProps): React.JSX.Element => (
	<span className="relative flex items-center justify-center">
		<span
			className={cn(
				'absolute inline-flex size-3 animate-ping rounded-full opacity-50',
				props.isRunning && 'bg-blue-600 dark:bg-blue-300',
				props.isFinished && 'bg-green-600 dark:bg-green-300'
			)}
		/>
		<span
			className={cn(
				'relative inline-flex size-2 rounded-full',
				props.isRunning && 'bg-blue-600 dark:bg-blue-300',
				props.isFinished && 'bg-green-600 dark:bg-green-300'
			)}
		/>
	</span>
);

const getButtonLabel = (status: TestState['status']) => {
	switch (status) {
		case 'idle':
			return 'Démarrer le test';
		case 'running':
			return 'Arrêter le test';
		case 'finished':
			return 'Refaire le test';
		default:
			return 'Démarrer le test';
	}
};

export const InternetSpeedTest = (): React.JSX.Element => {
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
		<>
			<div className="grid gap-6 py-6 sm:grid-cols-2 md:grid-cols-4">
				<Card
					className={cn(
						'relative row-span-1 flex flex-col gap-y-8 border-edge p-4 md:col-span-2 md:gap-y-12 md:p-6',
						'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
						'bg-black/0.75 bg-center bg-size-[10px_10px] dark:bg-white/0.75',
						'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5',
						testState.status === 'running' &&
							'outline-1 outline-blue-600 outline-offset-1 transition dark:outline-blue-300',
						testState.status === 'finished' &&
							'outline-1 outline-green-600 outline-offset-1 transition dark:outline-green-300'
					)}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-3">
							<DownloadIcon className="size-4 md:size-5" />
							<h4 className="!font-normal mt-0 mb-0 text-sm md:text-base">
								Téléchargement
							</h4>
						</div>
						<PulsatingCircle
							isFinished={testState.status === 'finished'}
							isRunning={testState.status === 'running'}
						/>
					</div>

					<div className="flex flex-1 flex-col justify-end">
						<div className="font-bold font-mono text-3xl tabular-nums leading-none md:text-5xl">
							{((testState.result.download || 0) / 1_000_000).toFixed(2)}
							<span className="ml-2 font-normal text-muted-foreground text-sm md:text-lg">
								Mb/s
							</span>
						</div>
					</div>
				</Card>

				<Card
					className={cn(
						'relative row-span-1 flex flex-col gap-y-8 border-edge p-4 md:col-span-2 md:gap-y-12 md:p-6',
						'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
						'bg-black/0.75 bg-center bg-size-[10px_10px] dark:bg-white/0.75',
						'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5',
						testState.status === 'running' &&
							'outline-1 outline-blue-600 outline-offset-1 transition dark:outline-blue-300',
						testState.status === 'finished' &&
							'outline-1 outline-green-600 outline-offset-1 transition dark:outline-green-300'
					)}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-3">
							<UploadIcon className="size-4 md:size-5" />
							<h4 className="!font-normal mt-0 mb-0 text-sm md:text-base">
								Téléversement
							</h4>
						</div>
						<PulsatingCircle
							isFinished={testState.status === 'finished'}
							isRunning={testState.status === 'running'}
						/>
					</div>

					<div className="flex flex-1 flex-col justify-end">
						<div className="font-bold font-mono text-3xl tabular-nums leading-none md:text-5xl">
							{((testState.result.upload || 0) / 1_000_000).toFixed(2)}
							<span className="ml-2 font-normal text-muted-foreground text-sm md:text-lg">
								Mb/s
							</span>
						</div>
					</div>
				</Card>

				<Card
					className={cn(
						'relative row-span-1 flex flex-col gap-y-8 border-edge p-4 md:col-span-2 md:gap-y-12 md:p-6',
						'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
						'bg-black/0.75 bg-center bg-size-[10px_10px] dark:bg-white/0.75',
						'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5',
						testState.status === 'running' &&
							'outline-1 outline-blue-600 outline-offset-1 transition dark:outline-blue-300',
						testState.status === 'finished' &&
							'outline-1 outline-green-600 outline-offset-1 transition dark:outline-green-300'
					)}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-3">
							<SpeedometerIcon className="size-4 md:size-5" />
							<h4 className="!font-normal mt-0 mb-0 text-sm md:text-base">
								Latence moyenne
							</h4>
						</div>
						<PulsatingCircle
							isFinished={testState.status === 'finished'}
							isRunning={testState.status === 'running'}
						/>
					</div>

					<div className="flex flex-1 flex-col justify-end">
						<div className="font-bold font-mono text-3xl tabular-nums leading-none md:text-5xl">
							{(testState.result.latency || 0).toFixed(3)}
							<span className="ml-2 font-normal text-muted-foreground text-sm md:text-lg">
								ms
							</span>
						</div>
					</div>
				</Card>

				<Card
					className={cn(
						'relative row-span-1 flex flex-col gap-y-8 border-edge p-4 md:col-span-2 md:gap-y-12 md:p-6',
						'bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]',
						'bg-black/0.75 bg-center bg-size-[10px_10px] dark:bg-white/0.75',
						'[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5',
						testState.status === 'running' &&
							'outline-1 outline-blue-600 outline-offset-1 transition dark:outline-blue-300',
						testState.status === 'finished' &&
							'outline-1 outline-green-600 outline-offset-1 transition dark:outline-green-300'
					)}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-3">
							<GaugeIcon className="size-4 md:size-5" />
							<h4 className="!font-normal mt-0 mb-0 text-sm md:text-base">
								Gigue moyenne
							</h4>
						</div>
						<PulsatingCircle
							isFinished={testState.status === 'finished'}
							isRunning={testState.status === 'running'}
						/>
					</div>

					<div className="flex flex-1 flex-col justify-end">
						<div className="font-bold font-mono text-3xl tabular-nums leading-none md:text-5xl">
							{(testState.result.jitter || 0).toFixed(3)}
							<span className="ml-2 font-normal text-muted-foreground text-sm md:text-lg">
								ms
							</span>
						</div>
					</div>
				</Card>
			</div>

			<div className="screen-line-before w-full border-edge border-b" />

			<div className="flex justify-center py-2">
				<Button
					onClick={toggleTest}
					onKeyDown={(event: { key: string; preventDefault: () => void }) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							toggleTest();
						}
					}}
					tabIndex={0}
					variant="default"
				>
					{getButtonLabel(testState.status)}
				</Button>
			</div>
		</>
	);
};
