'use client';

import {
	ArrowsClockwiseIcon,
	CheckIcon,
	CopyIcon,
	LockKeyIcon,
	LockSimpleOpenIcon,
	SwatchesIcon,
} from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { Poline, positionFunctions } from 'poline';
import type React from 'react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ColorPicker } from '@/components/ui/ColorPicker';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/Tooltip';

type ColorScheme = {
	[key: string]: string;
};

export const ColorGenerator = (): React.JSX.Element => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>({
		background: '0 0% 100%',
		foreground: '240 10% 3.9%',
		card: '0 0% 100%',
		'card-foreground': '240 10% 3.9%',
		popover: '0 0% 100%',
		'popover-foreground': '240 10% 3.9%',
		primary: '240 5.9% 10%',
		'primary-foreground': '0 0% 98%',
		secondary: '240 4.8% 95.9%',
		'secondary-foreground': '240 5.9% 10%',
		muted: '240 4.8% 95.9%',
		'muted-foreground': '240 3.8% 46.1%',
		accent: '240 4.8% 95.9%',
		'accent-foreground': '240 5.9% 10%',
		destructive: '0 84.2% 60.2%',
		'destructive-foreground': '0 0% 98%',
		border: '240 5.9% 90%',
		input: '240 5.9% 90%',
		ring: '240 5.9% 10%',
	});

	const [lockedColor, setLockedColor] = useState<string | null>(null);
	const [copiedColor, setCopiedColor] = useState<string | null>(null);

	const genColors = useCallback(() => {
		setColorScheme((prevScheme) => {
			const anchorColors: [number, number, number][] = [];

			if (lockedColor) {
				const [h, s, l] = prevScheme[lockedColor]
					.split(' ')
					.map(Number.parseFloat);
				anchorColors.push([h, s / 100, l / 100]);
			}

			while (anchorColors.length < 3) {
				anchorColors.push([Math.random() * 360, 0.7, 0.5]);
			}

			const poline = new Poline({
				numPoints: 20,
				anchorColors,
				positionFunctionX: positionFunctions.sinusoidalPosition,
				positionFunctionY: positionFunctions.quadraticPosition,
				positionFunctionZ: positionFunctions.linearPosition,
			});

			const newColorScheme = { ...prevScheme };
			const colors = poline.colorsCSS;

			Object.keys(newColorScheme).forEach((key, index) => {
				if (key !== lockedColor) {
					const color = colors[index % colors.length];
					const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [
						0, 0, 0,
					];

					let adjustedLightness = l;

					if (key.includes('foreground')) {
						adjustedLightness = Math.min(l - 30, 20);
					} else if (key === 'background') {
						adjustedLightness = Math.max(l + 30, 90);
					} else if (key === 'border' || key === 'input') {
						adjustedLightness = Math.min(Math.max(l, 70), 90);
					}

					newColorScheme[key] = `${h.toFixed(1)} ${s.toFixed(
						1
					)}% ${adjustedLightness.toFixed(1)}%`;
				}
			});

			return newColorScheme;
		});
	}, [lockedColor]);

	const resetColors = useCallback(() => {
		setColorScheme({
			background: '0 0% 100%',
			foreground: '240 10% 3.9%',
			card: '0 0% 100%',
			'card-foreground': '240 10% 3.9%',
			popover: '0 0% 100%',
			'popover-foreground': '240 10% 3.9%',
			primary: '240 5.9% 10%',
			'primary-foreground': '0 0% 98%',
			secondary: '240 4.8% 95.9%',
			'secondary-foreground': '240 5.9% 10%',
			muted: '240 4.8% 95.9%',
			'muted-foreground': '240 3.8% 46.1%',
			accent: '240 4.8% 95.9%',
			'accent-foreground': '240 5.9% 10%',
			destructive: '0 84.2% 60.2%',
			'destructive-foreground': '0 0% 98%',
			border: '240 5.9% 90%',
			input: '240 5.9% 90%',
			ring: '240 5.9% 10%',
		});

		setLockedColor(null);
	}, []);

	const copyColorScheme = useCallback(() => {
		const cssVariables = Object.entries(colorScheme)
			.map(([key, value]) => `--${key}: ${value};`)
			.join('\n    ');

		const fullCss = `@layer base {
  :root {
    ${cssVariables}
  }
}`;
		navigator.clipboard.writeText(fullCss);
		setCopiedColor('all');
		setTimeout(() => setCopiedColor(null), 2000);
	}, [colorScheme]);

	const getContrastColor = useCallback((color: string) => {
		const [, , lightness] = color.split(' ').map(Number.parseFloat);

		return lightness > 50 ? '0 0% 0%' : '0 0% 100%';
	}, []);

	const toggleLock = useCallback((key: string) => {
		setLockedColor((prev) => (prev === key ? null : key));
	}, []);

	return (
		<>
			<div className="screen-line-before w-full border-edge border-b" />

			<div className="flex flex-row justify-between gap-x-3 p-4">
				<Button className="text-sm" onClick={genColors} variant="outline">
					<SwatchesIcon className="size-5" />
					Générer
				</Button>
				<Button className="text-sm" onClick={resetColors} variant="outline">
					<ArrowsClockwiseIcon className="size-5" />
					Réinitialiser
				</Button>
			</div>

			<div className="screen-line-before w-full border-edge border-b" />

			<div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2">
				{Object.entries(colorScheme).map(([key, value]) => (
					<div className="relative" key={key}>
						<div className="flex items-center justify-between">
							<span className="block font-medium text-muted-foreground text-sm">
								{key}
							</span>
							<Button
								className="ml-2"
								onClick={() => toggleLock(key)}
								size="icon"
								variant="ghost"
							>
								{lockedColor === key ? (
									<LockKeyIcon className="size-5" />
								) : (
									<LockSimpleOpenIcon className="size-5" />
								)}
							</Button>
						</div>

						<div className="mt-2 flex items-center">
							<ColorPicker
								color={`hsl(${value})`}
								onChangeAction={(newColor) => {
									const [h, s, l] = newColor
										.match(/\d+(\.\d+)?/g)
										?.map(Number) || [0, 0, 0];
									setColorScheme({
										...colorScheme,
										[key]: `${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%`,
									});
								}}
							/>
						</div>
					</div>
				))}
			</div>

			<div className="screen-line-before w-full border-edge border-b" />

			<div className="p-4">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="h-full min-h-[24rem] w-full overflow-hidden rounded-lg p-6 shadow-lg transition-colors duration-300 ease-in-out"
					initial={{ opacity: 0, y: 20 }}
					style={{
						backgroundColor: `hsl(${colorScheme.background})`,
						color: `hsl(${colorScheme.foreground})`,
						borderColor: `hsl(${colorScheme.border})`,
						borderWidth: 2,
						borderStyle: 'solid',
					}}
					transition={{ duration: 0.5 }}
				>
					<h3 className="mt-0 mb-2 font-semibold text-black text-xl">
						Aperçu des couleurs
					</h3>
					<p className="mb-6 font-medium text-sm">
						Explorez une palette de couleurs harmonieuses générée pour vos
						projets web. Chaque couleur est soigneusement sélectionnée pour
						assurer une esthétique cohérente et attrayante.
					</p>
					<div className="space-y-6">
						{Object.entries(colorScheme).map(([key, value]) => (
							<div
								className="flex flex-col justify-between gap-2 md:flex-row md:items-center"
								key={key}
							>
								<span>{key}</span>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												className="font-mono"
												onClick={() => {
													navigator.clipboard.writeText(`--${key}: ${value};`);
													setCopiedColor(key);
													setTimeout(() => setCopiedColor(null), 2000);
												}}
												size="sm"
												style={{
													backgroundColor: `hsl(${value})`,
													color: `hsl(${getContrastColor(value)})`,
													borderColor: `hsl(${colorScheme.border})`,
												}}
												variant="outline"
											>
												{value}
												{copiedColor === key ? (
													<CheckIcon className="ml-2 size-4" />
												) : (
													<CopyIcon className="ml-2 size-4" />
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Copier la couleur</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						))}
					</div>
				</motion.div>
			</div>

			<div className="screen-line-before w-full border-edge border-b" />

			<div className="flex justify-center py-2">
				<Button onClick={copyColorScheme} variant="default">
					Copier toutes les couleurs
				</Button>
			</div>
		</>
	);
};
