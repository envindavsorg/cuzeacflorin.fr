'use client';

import type React from 'react';
import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { FallbackImage } from '@/components/widgets/location/FallbackImage';
import { MapView } from '@/components/widgets/location/MapView';
import useLocationMap from '@/hooks/useLocationMap';
import { cn } from '@/lib/utils';

export const LocationWidget = memo((): React.JSX.Element => {
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
			className={cn(
				'group relative justify-center rounded-3xl p-0',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
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

LocationWidget.displayName = 'LocationWidget';
