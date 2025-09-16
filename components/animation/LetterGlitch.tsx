import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type LetterGlitchProps = {
	glitchColors: string[];
	glitchSpeed?: number;
	centerVignette?: boolean;
	outerVignette?: boolean;
	smooth?: boolean;
	className?: string;
};

type Letter = {
	char: string;
	color: string;
	targetColor: string;
	colorProgress: number;
};

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;
const UPDATE_RATIO = 0.05;
const SMOOTH_STEP = 0.05;

const CHARS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>,0123456789'.split('');

const LetterGlitch: React.FC<LetterGlitchProps> = ({
	glitchColors,
	glitchSpeed = 50,
	centerVignette = true,
	outerVignette = true,
	smooth = true,
	className,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stateRef = useRef({
		ctx: null as CanvasRenderingContext2D | null,
		animationId: 0,
		letters: [] as Letter[],
		grid: { columns: 0, rows: 0 },
		lastGlitch: 0,
		mounted: true,
	});

	const getRandomChar = useCallback(
		() => CHARS[Math.floor(Math.random() * CHARS.length)],
		[]
	) as () => string;

	const getRandomColor = useCallback(
		() => glitchColors[Math.floor(Math.random() * glitchColors.length)],
		[glitchColors]
	) as () => string;

	const hexToRgb = useCallback((hex: string) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
			hex.replace(
				/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
				(_, r, g, b) => r + r + g + g + b + b
			)
		);
		return result
			? {
					r: Number.parseInt(String(result[1]), 16),
					g: Number.parseInt(String(result[2]), 16),
					b: Number.parseInt(String(result[3]), 16),
				}
			: null;
	}, []);

	const interpolateColor = useCallback(
		(
			start: ReturnType<typeof hexToRgb>,
			end: ReturnType<typeof hexToRgb>,
			factor: number
		) => {
			if (!(start && end)) {
				return null;
			}
			return `rgb(${Math.round(start.r + (end.r - start.r) * factor)}, ${Math.round(
				start.g + (end.g - start.g) * factor
			)}, ${Math.round(start.b + (end.b - start.b) * factor)})`;
		},
		[]
	);

	const initializeLetters = useCallback(
		(columns: number, rows: number) => {
			const state = stateRef.current;
			state.grid = { columns, rows };
			const total = columns * rows;

			state.letters = Array.from({ length: total }, () => ({
				char: getRandomChar(),
				color: getRandomColor(),
				targetColor: getRandomColor(),
				colorProgress: 1,
			}));
		},
		[getRandomChar, getRandomColor]
	);

	const draw = useCallback(() => {
		const { ctx, letters, grid } = stateRef.current;
		if (!(ctx && letters.length)) {
			return;
		}

		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = `${FONT_SIZE}px monospace`;
		ctx.textBaseline = 'top';

		for (let i = 0; i < letters.length; i++) {
			const letter = letters[i];
			const x = (i % grid.columns) * CHAR_WIDTH;
			const y = Math.floor(i / grid.columns) * CHAR_HEIGHT;
			ctx.fillStyle = letter!.color;
			ctx.fillText(letter!.char, x, y);
		}
	}, []);

	const updateLetters = useCallback(() => {
		const { letters } = stateRef.current;
		if (!letters.length) {
			return;
		}

		const updateCount = Math.max(1, Math.floor(letters.length * UPDATE_RATIO));

		for (let i = 0; i < updateCount; i++) {
			const index = Math.floor(Math.random() * letters.length);
			const letter = letters[index];

			letter!.char = getRandomChar();
			letter!.targetColor = getRandomColor();
			letter!.colorProgress = smooth ? 0 : 1;

			if (!smooth) {
				letter!.color = letter!.targetColor;
			}
		}
	}, [getRandomChar, getRandomColor, smooth]);

	const updateSmoothTransitions = useCallback(() => {
		const { letters } = stateRef.current;
		let needsRedraw = false;

		for (const letter of letters) {
			if (letter.colorProgress < 1) {
				letter.colorProgress = Math.min(1, letter.colorProgress + SMOOTH_STEP);

				const startRgb = hexToRgb(letter.color);
				const endRgb = hexToRgb(letter.targetColor);
				const newColor = interpolateColor(
					startRgb,
					endRgb,
					letter.colorProgress
				);

				if (newColor) {
					letter.color = newColor;
					needsRedraw = true;
				}

				if (letter.colorProgress === 1) {
					letter.color = letter.targetColor;
				}
			}
		}

		return needsRedraw;
	}, [hexToRgb, interpolateColor]);

	const animate = useCallback(() => {
		if (!stateRef.current.mounted) {
			return;
		}

		const now = performance.now();
		const state = stateRef.current;

		if (now - state.lastGlitch >= glitchSpeed) {
			updateLetters();
			draw();
			state.lastGlitch = now;
		}

		if (smooth && updateSmoothTransitions()) {
			draw();
		}

		state.animationId = requestAnimationFrame(animate);
	}, [glitchSpeed, smooth, updateLetters, updateSmoothTransitions, draw]);

	const setupCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		const parent = canvas?.parentElement;
		if (!(canvas && parent)) {
			return;
		}

		const dpr = window.devicePixelRatio || 1;
		const rect = parent.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		const ctx = canvas.getContext('2d', { alpha: false });
		if (ctx) {
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			stateRef.current.ctx = ctx;
		}

		const columns = Math.ceil(rect.width / CHAR_WIDTH);
		const rows = Math.ceil(rect.height / CHAR_HEIGHT);
		initializeLetters(columns, rows);
		draw();
	}, [initializeLetters, draw]);

	useEffect(() => {
		stateRef.current.mounted = true;
		setupCanvas();

		const handleResize = () => {
			cancelAnimationFrame(stateRef.current.animationId);
			setupCanvas();
			stateRef.current.animationId = requestAnimationFrame(animate);
		};

		const resizeObserver = new ResizeObserver(handleResize);
		const parent = canvasRef.current?.parentElement;
		if (parent) {
			resizeObserver.observe(parent);
		}

		stateRef.current.animationId = requestAnimationFrame(animate);

		return () => {
			stateRef.current.mounted = false;
			cancelAnimationFrame(stateRef.current.animationId);
			resizeObserver.disconnect();
		};
	}, [setupCanvas, animate]);

	return (
		<div
			className={cn(
				'pointer-events-none fixed inset-y-0 z-10 size-full select-none overflow-hidden bg-black',
				className
			)}
		>
			<canvas className="block size-full" ref={canvasRef} />
			{outerVignette && (
				<div
					className="pointer-events-none absolute top-0 left-0 size-full"
					style={
						{
							background:
								'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)',
						} as React.CSSProperties
					}
				/>
			)}
			{centerVignette && (
				<div
					className="pointer-events-none absolute top-0 left-0 size-full"
					style={
						{
							background:
								'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
						} as React.CSSProperties
					}
				/>
			)}
		</div>
	);
};

export default LetterGlitch;
