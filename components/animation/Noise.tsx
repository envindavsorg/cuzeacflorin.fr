'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';

type NoiseProps = {
	patternRefreshInterval?: number;
	patternAlpha?: number;
};

export const Noise: React.FC<NoiseProps> = ({
	patternRefreshInterval = 2,
	patternAlpha = 15,
}): React.JSX.Element => {
	const grainRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = grainRef.current;
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) {
			return;
		}

		let frame = 0;
		let animationId: number;
		const canvasSize = 1024;

		const resize = () => {
			if (!canvas) {
				return;
			}
			canvas.width = canvasSize;
			canvas.height = canvasSize;

			const body = document.body;
			const html = document.documentElement;

			const fullHeight = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight,
				html.scrollHeight,
				html.offsetHeight
			);

			const fullWidth = Math.max(
				body.scrollWidth,
				body.offsetWidth,
				html.clientWidth,
				html.scrollWidth,
				html.offsetWidth
			);

			canvas.style.width = `${fullWidth}px`;
			canvas.style.height = `${fullHeight}px`;
		};

		const drawGrain = () => {
			const imageData = ctx.createImageData(canvasSize, canvasSize);
			const data = imageData.data;

			for (let i = 0; i < data.length; i += 4) {
				const value = Math.random() * 255;
				data[i] = value;
				data[i + 1] = value;
				data[i + 2] = value;
				data[i + 3] = patternAlpha;
			}

			ctx.putImageData(imageData, 0, 0);
		};

		const loop = () => {
			if (frame % patternRefreshInterval === 0) {
				drawGrain();
			}
			frame++;
			animationId = window.requestAnimationFrame(loop);
		};

		const resizeObserver = new ResizeObserver(() => {
			resize();
		});

		resizeObserver.observe(document.body);

		window.addEventListener('resize', resize);
		resize();
		loop();

		return () => {
			window.removeEventListener('resize', resize);
			resizeObserver.disconnect();
			window.cancelAnimationFrame(animationId);
		};
	}, [patternRefreshInterval, patternAlpha]);

	return (
		<canvas
			className="pointer-events-none fixed inset-0"
			ref={grainRef}
			style={{
				imageRendering: 'pixelated',
				minHeight: '100vh',
				minWidth: '100vw',
			}}
		/>
	);
};
