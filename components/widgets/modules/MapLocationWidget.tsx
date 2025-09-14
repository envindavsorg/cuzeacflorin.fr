'use client';

import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import type React from 'react';
import { memo } from 'react';
import { defaultVariantsNoDelay } from '@/components/animation/motion/motion.variants';
import { Card } from '@/components/ui/Card';
import { MapView } from '@/components/widgets/modules/map/MapView';
import useLocationMap from '@/hooks/useLocationMap';

export const MapLocationWidget = memo((): React.JSX.Element => {
	const {
		mouseEntered,
		viewState,
		isLoaded,
		hasError,
		canZoomIn,
		canZoomOut,
		mapRef,
		handleZoom,
		handleMove,
		handleLoad,
		handleError,
		handleMouseEnter,
		handleMouseLeave,
	} = useLocationMap();

	const MotionLink = motion.create(Link);

	return (
		<MotionLink
			aria-label="Voir ma localisation !"
			href="https://www.google.com/maps/place/Paris,+France"
			layoutId="map-location-widget"
			rel="noopener noreferrer"
			target="_blank"
			variants={defaultVariantsNoDelay}
			whileHover={{ scale: 1.025 }}
		>
			<Card className="h-full p-0">
				{hasError ? (
					<p>Error</p>
				) : (
					<MapView
						canZoomIn={canZoomIn}
						canZoomOut={canZoomOut}
						handleMouseEnter={handleMouseEnter}
						handleMouseLeave={handleMouseLeave}
						isLoaded={isLoaded}
						mouseEntered={mouseEntered}
						onError={handleError}
						onLoad={handleLoad}
						onMove={handleMove}
						onZoomIn={() => handleZoom('in')}
						onZoomOut={() => handleZoom('out')}
						ref={mapRef}
						viewState={viewState}
					/>
				)}
			</Card>
		</MotionLink>
	);
});
