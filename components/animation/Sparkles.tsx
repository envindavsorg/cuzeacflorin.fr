'use client';

import type { Container, ISourceOptions } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { logger } from '@/lib/logger';
import { checkPerformanceSupport, createSparkleOptions } from '@/lib/sparkles';
import { cn } from '@/lib/utils';

type SparklesProps = {
	id?: string;
	className?: string;
	density?: number;
	minSize?: number;
	maxSize?: number;
	speed?: number;
	background?: string;
	particleColor?: string;
	delayLoad?: number;
};

export const Sparkles = memo(
	({
		id = 'tsparticles',
		className,
		density = 50,
		minSize = 0.5,
		maxSize = 1,
		speed = 2,
		background = 'transparent',
		particleColor,
		delayLoad = 1000,
	}: SparklesProps): React.JSX.Element | null => {
		const { resolvedTheme } = useTheme();
		const [isInitialized, setIsInitialized] = useState(false);
		const [shouldRender, setShouldRender] = useState(false);

		useEffect(() => {
			const canRender = checkPerformanceSupport();
			if (!canRender) {
				return;
			}

			const timer = setTimeout(() => {
				setShouldRender(true);
			}, delayLoad);

			return () => clearTimeout(timer);
		}, [delayLoad]);

		useEffect(() => {
			if (!shouldRender) {
				return;
			}

			let _isMounted = true;

			const initEngine = async () => {
				try {
					await initParticlesEngine(async (engine) => {
						await loadSlim(engine);
					});

					setIsInitialized(true);
				} catch (error) {
					logger.warn('Failed to initialize particles engine:', error);
				}
			};

			initEngine();

			return () => {
				_isMounted = false;
			};
		}, [shouldRender]);

		const color = useMemo(() => {
			if (particleColor) {
				return particleColor;
			}
			return resolvedTheme === 'dark' ? '#FFFFFF' : '#000000';
		}, [particleColor, resolvedTheme]);

		const options: ISourceOptions = useMemo(
			() =>
				createSparkleOptions({
					density,
					minSize,
					maxSize,
					speed,
					color,
					background,
				}),
			[density, minSize, maxSize, speed, color, background]
		);

		const particlesLoaded = useCallback(
			async (_container?: Container): Promise<void> => {
				logger.debug('Particles loaded successfully');
			},
			[]
		);

		if (!(shouldRender && isInitialized)) {
			return null;
		}

		return (
			<div
				className={cn(
					'-z-10 pointer-events-none fixed inset-0 size-full overflow-hidden',
					className
				)}
			>
				<Particles
					className="size-full"
					id={id}
					options={options}
					particlesLoaded={particlesLoaded}
				/>
			</div>
		);
	}
);

Sparkles.displayName = 'Sparkles';
