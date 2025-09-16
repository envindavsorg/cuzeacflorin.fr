'use client';

import type React from 'react';
import { memo } from 'react';
import { MapView } from '@/components/map/MapView';
import { Card } from '@/components/ui/Card';
import { GridItem } from '@/components/widgets/GridItem';
import useLocationMap from '@/hooks/useLocationMap';

export const MapLocation = memo((): React.JSX.Element => {
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

	return (
		<GridItem
			aria="Voir ma localisation !"
			link="https://www.google.com/maps/place/Paris,+France"
			slug="map-location-widget"
		>
			<Card className="h-full p-0">
				{hasError ? (
					<p>Error</p>
				) : (
					<>
						<div className="absolute top-0 z-10 h-16 w-full bg-gradient-to-b from-input to-transparent" />
						<div className="absolute bottom-0 z-10 h-4 w-full bg-gradient-to-t from-input to-transparent" />
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
					</>
				)}
			</Card>
		</GridItem>
	);
});
