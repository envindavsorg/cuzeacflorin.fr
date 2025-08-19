'use client';

import { GlobeHemisphereWestIcon } from '@phosphor-icons/react';
import createGlobe, { type COBEOptions } from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Title } from '@/components/text/Title';
import { Card } from '@/components/ui/Card';
import { Pattern } from '@/components/ui/Pattern';
import { dark, light, physics, yellow } from '@/lib/globe';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';
import {
	selectIsGlobeHovered,
	selectSetGlobeHovered,
	useLocationStore,
} from '@/stores/location-store';

const { location } = PROFILE_CONFIG;

export const Location = memo((): React.JSX.Element => {
	const { resolvedTheme } = useTheme();

	const isGlobeHovered = useLocationStore(selectIsGlobeHovered);
	const setGlobeHovered = useLocationStore(selectSetGlobeHovered);

	const canvas = useRef<HTMLCanvasElement | null>(null);
	const pointerInteracting = useRef<number | null>(null);
	const pointerInteractionMovement = useRef(0);

	const r = useMotionValue(0);
	const rSpring = useSpring(r, physics);

	const handleGlobeMouseEnter = useCallback(() => {
		setGlobeHovered(true);
	}, [setGlobeHovered]);

	const handleGlobeMouseLeave = useCallback(() => {
		setGlobeHovered(false);
	}, [setGlobeHovered]);

	const globeConfig = useMemo(
		(): Omit<COBEOptions, 'width' | 'height' | 'onRender'> => ({
			devicePixelRatio: 2,
			phi: 0,
			theta: 0.2,
			diffuse: 3,
			mapSamples: 36000,
			mapBrightness: 6,
			baseColor: [0.3, 0.3, 0.3],
			markerColor: yellow,
			glowColor: resolvedTheme === 'dark' ? light : dark,
			scale: 1,
			dark: 0,
			markers: [
				{
					location: [
						location.coordinates.latitude,
						location.coordinates.longitude,
					],
					size: 0.1,
				},
			],
		}),
		[resolvedTheme],
	);

	const onResize = useCallback((canvas: HTMLCanvasElement): number => {
		return canvas.offsetWidth;
	}, []);

	useEffect(() => {
		let width = 0;
		let phi = 3;
		const direction = 1;

		const handleResize = (): void => {
			if (canvas.current) {
				width = onResize(canvas.current);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		if (!canvas.current) {
			return;
		}

		const fullGlobeConfig: COBEOptions = {
			...globeConfig,
			width: width * 2,
			height: width * 2,
			onRender: (state: Record<string, number>) => {
				const adjustment: number =
					0.001 *
					(state.phi > 5.5 ? -1 : state.phi < 3.25 ? 1 : direction);
				phi += adjustment;
				state.phi = phi + rSpring.get();
				state.width = state.height = width * 2;
			},
		};

		const globe = createGlobe(canvas.current, fullGlobeConfig);

		return () => {
			window.removeEventListener('resize', handleResize);
			globe.destroy();
		};
	}, [rSpring, globeConfig, onResize]);

	return (
		<Card
			className={cn(
				'relative gap-4 rounded-3xl px-8 py-6',
				'size-full select-none overflow-hidden shadow-xs transition-shadow duration-300 hover:shadow-sm',
				!isGlobeHovered && 'md:cursor-grab md:active:cursor-grabbing',
				isGlobeHovered && 'cursor-auto',
			)}
		>
			<div className="z-10 flex items-center gap-2">
				<GlobeHemisphereWestIcon weight="regular" className="size-7" />
				<Title
					name={location.city}
					subtitle={`en ${location.country}`}
				/>
			</div>

			<div className="absolute inset-x-0 bottom-[-75%] mx-auto aspect-square h-[150%] translate-x-[-12.5%] [@media(max-width:420px)]:h-[320px]">
				<div className="flex size-full place-content-center place-items-center overflow-visible">
					<div
						className={cn(
							'aspect-square w-full [-webkit-mask-image:radial-gradient(circle_at_50%_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_70%)] [mask-image:radial-gradient(circle_at_50%_50%,rgb(0,0,0)_60%,rgba(0,0,0,0)_70%)]',
							isGlobeHovered && 'cancel-drag',
						)}
						onMouseEnter={handleGlobeMouseEnter}
						onMouseLeave={handleGlobeMouseLeave}
					>
						<canvas
							ref={canvas}
							onPointerDown={(
								event: React.PointerEvent<HTMLCanvasElement>,
							) => {
								pointerInteracting.current =
									event.clientX -
									pointerInteractionMovement.current;
								if (canvas.current) {
									canvas.current.style.cursor = 'grabbing';
								}
							}}
							onPointerUp={() => {
								pointerInteracting.current = null;
								if (canvas.current) {
									canvas.current.style.cursor = 'grab';
								}
							}}
							onPointerOut={() => {
								pointerInteracting.current = null;
								if (canvas.current) {
									canvas.current.style.cursor = 'grab';
								}
							}}
							onMouseMove={(
								event: React.MouseEvent<
									HTMLCanvasElement,
									MouseEvent
								>,
							) => {
								if (pointerInteracting.current !== null) {
									const delta =
										event.clientX -
										pointerInteracting.current;
									pointerInteractionMovement.current = delta;
									r.set(delta / 200);
								}
							}}
							onTouchMove={(
								event: React.TouchEvent<HTMLCanvasElement>,
							) => {
								if (
									pointerInteracting.current !== null &&
									event.touches[0]
								) {
									const delta =
										event.touches[0].clientX -
										pointerInteracting.current;
									pointerInteractionMovement.current = delta;
									r.set(delta / 100);
								}
							}}
							className="size-full cursor-auto select-none"
							style={{ contain: 'layout paint size' }}
						/>
					</div>
				</div>
			</div>

			<Pattern />
		</Card>
	);
});

Location.displayName = 'Location';
