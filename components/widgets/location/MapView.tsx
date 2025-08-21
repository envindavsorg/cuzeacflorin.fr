'use client';

import { useTheme } from 'next-themes';
import { forwardRef, memo } from 'react';
import MapGL, { type MapRef, Marker } from 'react-map-gl/mapbox';
import type { ViewStateChangeEvent } from 'react-map-gl/mapbox-legacy';
import { LocationMarker } from '@/components/widgets/location/LocationMarker';
import { ZoomControls } from '@/components/widgets/location/ZoomControls';
import { PROFILE_CONFIG } from '@/resources/profile';
import 'mapbox-gl/dist/mapbox-gl.css';

const { location } = PROFILE_CONFIG;

const MAP_STYLES = {
	light: 'mapbox://styles/mapbox/light-v11',
	dark: 'mapbox://styles/mapbox/dark-v11',
} as const;

type ViewState = {
	latitude: number;
	longitude: number;
	zoom: number;
};

type MapViewProps = {
	viewState: ViewState;
	mouseEntered: boolean;
	isLoaded: boolean;
	canZoomIn: boolean;
	canZoomOut: boolean;
	onMove: (event: ViewStateChangeEvent) => void;
	onLoad: () => void;
	onError: () => void;
	onZoomIn: () => void;
	onZoomOut: () => void;
};

export const MapView = memo(
	forwardRef<MapRef, MapViewProps>(
		(
			{
				viewState,
				mouseEntered,
				isLoaded,
				canZoomIn,
				canZoomOut,
				onMove,
				onLoad,
				onError,
				onZoomIn,
				onZoomOut,
			},
			ref,
		) => {
			const { resolvedTheme } = useTheme();

			return (
				<MapGL
					ref={ref}
					{...viewState}
					attributionControl={false}
					doubleClickZoom={false}
					dragPan={false}
					dragRotate={false}
					initialViewState={viewState}
					mapboxAccessToken={
						process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
					}
					mapStyle={
						MAP_STYLES[resolvedTheme === 'dark' ? 'dark' : 'light']
					}
					maxZoom={location.zoom.max}
					minZoom={location.zoom.min}
					onError={onError}
					onLoad={onLoad}
					onMove={onMove}
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
						<LocationMarker mouseEntered={mouseEntered} />
					</Marker>

					{isLoaded && (
						<ZoomControls
							canZoomIn={canZoomIn}
							canZoomOut={canZoomOut}
							onZoomIn={onZoomIn}
							onZoomOut={onZoomOut}
						/>
					)}
				</MapGL>
			);
		},
	),
);

MapView.displayName = 'MapView';
