'use client';

import type React from 'react';
import { memo } from 'react';
import { FallbackImage } from '@/components/map/FallbackImage';
import { MapView } from '@/components/map/MapView';
import { Card } from '@/components/ui/Card';
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
		<Card
			className="h-full p-0"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{hasError ? (
				<FallbackImage />
			) : (
				<MapView
					canZoomIn={canZoomIn}
					canZoomOut={canZoomOut}
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
	);
});
