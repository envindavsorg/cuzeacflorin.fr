'use client';

import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import type React from 'react';
import { memo, useMemo, useRef, useState } from 'react';
import MapGL, { type MapRef, Marker } from 'react-map-gl/mapbox';
import type { ViewStateChangeEvent } from 'react-map-gl/mapbox-legacy';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import darkMap from '@/images/map/dark.webp';
import lightMap from '@/images/map/light.webp';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';
import 'mapbox-gl/dist/mapbox-gl.css';

const { firstName, lastName, location, avatars } = PROFILE_CONFIG;

const MAP_STYLES = {
	light: 'mapbox://styles/mapbox/light-v11',
	dark: 'mapbox://styles/mapbox/dark-v11',
} as const;

type ViewState = {
	latitude: number;
	longitude: number;
	zoom: number;
};

export const LocationWidget = memo((): React.JSX.Element => {
	const { resolvedTheme } = useTheme();
	const [mouseEntered, setMouseEntered] = useState(false);
	const [viewState, setViewState] = useState<ViewState>({
		latitude: location.latitude,
		longitude: location.longitude,
		zoom: location.zoom.default,
	});
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	const markerElement = useMemo(
		() => (
			<motion.div
				animate={{ scale: mouseEntered ? 1.1 : 1 }}
				className="z-1 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-theme/20 ring ring-theme will-change-transform"
				transition={{ ease: [0.85, 0, 0.3, 1], duration: 0.5 }}
			>
				<motion.div
					animate={{
						scale: mouseEntered ? [1, 1.2, 1, 1.2, 1] : 1,
						rotate: mouseEntered ? [0, 15, 0, -15, 0] : 1,
					}}
					transition={{
						repeat: mouseEntered ? 1 / 0 : 0,
						duration: mouseEntered ? 1.6 : 0.5,
					}}
				>
					<Image
						alt={`${firstName} ${lastName}`}
						height={44}
						priority
						sizes="(max-width: 768px) 48px, 56px"
						src={avatars[0]}
						width={32}
					/>
				</motion.div>
			</motion.div>
		),
		[mouseEntered]
	);

	const mapRef = useRef<MapRef>(null);

	const handleZoom = (direction: 'in' | 'out') => {
		const newZoom =
			direction === 'in'
				? Math.min(viewState.zoom + location.zoom.step, location.zoom.max)
				: Math.max(viewState.zoom - location.zoom.step, location.zoom.min);

		if (mapRef.current) {
			mapRef.current.getMap().easeTo({
				zoom: newZoom,
				duration: 300,
			});
		}
	};

	const canZoomIn: boolean = viewState.zoom < location.zoom.max;
	const canZoomOut: boolean = viewState.zoom > location.zoom.min;

	const MotionButton = motion.create(Button);

	return (
		<Card
			className={cn(
				'group relative justify-center rounded-3xl p-0',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
			onMouseEnter={() => setMouseEntered(true)}
			onMouseLeave={() => setMouseEntered(false)}
		>
			{hasError ? (
				<Image
					alt={`${firstName} ${lastName}`}
					className="size-full object-cover"
					height={448}
					priority
					sizes="(max-width: 768px) 448px, 656px"
					src={resolvedTheme === 'dark' ? darkMap : lightMap}
					width={656}
				/>
			) : (
				<MapGL
					ref={mapRef}
					{...viewState}
					attributionControl={false}
					doubleClickZoom={false}
					dragPan={false}
					dragRotate={false}
					initialViewState={viewState}
					mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
					mapStyle={MAP_STYLES[resolvedTheme === 'dark' ? 'dark' : 'light']}
					maxZoom={location.zoom.max}
					minZoom={location.zoom.min}
					onError={() => setHasError(true)}
					onLoad={() => setIsLoaded(true)}
					onMove={(event: ViewStateChangeEvent) =>
						setViewState(event.viewState)
					}
					pitchWithRotate={false}
					reuseMaps
					scrollZoom={false}
					touchZoomRotate={false}
				>
					<Marker
						anchor="center"
						latitude={location.latitude}
						longitude={location.longitude}
					>
						{markerElement}
					</Marker>

					{isLoaded && (
						<div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
							<MotionButton
								disabled={!canZoomOut}
								onClick={() => handleZoom('out')}
								size="icon"
								variant="icon"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<MinusIcon className="size-5" weight="regular" />
							</MotionButton>
							<MotionButton
								disabled={!canZoomIn}
								onClick={() => handleZoom('in')}
								size="icon"
								variant="icon"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<PlusIcon className="size-5" weight="regular" />
							</MotionButton>
						</div>
					)}
				</MapGL>
			)}
		</Card>
	);
});

LocationWidget.displayName = 'Location';
