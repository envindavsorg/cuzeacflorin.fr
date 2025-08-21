'use client';

import { useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl/mapbox';
import type { ViewStateChangeEvent } from 'react-map-gl/mapbox-legacy';
import { PROFILE_CONFIG } from '@/resources/profile';

const { location } = PROFILE_CONFIG;

type ViewState = {
	latitude: number;
	longitude: number;
	zoom: number;
};

const useLocationMap = () => {
	const [mouseEntered, setMouseEntered] = useState(false);
	const [viewState, setViewState] = useState<ViewState>({
		latitude: location.latitude,
		longitude: location.longitude,
		zoom: location.zoom.default,
	});
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

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

	const handleMove = (event: ViewStateChangeEvent) => {
		setViewState(event.viewState);
	};

	const handleLoad = () => {
		setIsLoaded(true);
	};

	const handleError = () => {
		setHasError(true);
	};

	const handleMouseEnter = () => {
		setMouseEntered(true);
	};

	const handleMouseLeave = () => {
		setMouseEntered(false);
	};

	const canZoomIn = viewState.zoom < location.zoom.max;
	const canZoomOut = viewState.zoom > location.zoom.min;

	return {
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
	};
};

export default useLocationMap;
