'use client';

import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { BonjourEffect, BonjourStaticEffect } from '../effects/Bonjour';
import { HelloEffect } from '../effects/Hello';
import { HolaEffect } from '../effects/Hola';

type Greeting = 'bonjour' | 'hello' | 'hola';
const GREETINGS: Greeting[] = ['bonjour', 'hello', 'hola'];
const FADE_DELAY = 2000;

type GreetingsProps = {
	speed?: number;
	strokeWidth?: number;
	loop?: boolean;
	capture?: boolean;
};

export const Greetings = ({
	speed = 1,
	strokeWidth = 15,
	loop = true,
	capture = false,
}: GreetingsProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const currentGreeting = GREETINGS[currentIndex];

	const handleAnimationComplete = () => {
		if (!loop && currentIndex === GREETINGS.length - 1) {
			return;
		}

		setTimeout(() => {
			setCurrentIndex((prev) => (prev + 1) % GREETINGS.length);
		}, FADE_DELAY);
	};

	return capture ? (
		<BonjourStaticEffect />
	) : (
		<AnimatePresence mode="wait">
			{currentGreeting === 'bonjour' && (
				<BonjourEffect
					className="h-20 sm:h-30"
					key="bonjour"
					onAnimationComplete={handleAnimationComplete}
					speed={speed}
					strokeWidth={strokeWidth}
				/>
			)}

			{currentGreeting === 'hello' && (
				<HelloEffect
					className="h-15 sm:h-22"
					key="hello"
					onAnimationComplete={handleAnimationComplete}
					speed={speed}
					strokeWidth={strokeWidth}
				/>
			)}

			{currentGreeting === 'hola' && (
				<HolaEffect
					className="h-15 sm:h-22"
					key="hola"
					onAnimationComplete={handleAnimationComplete}
					speed={speed}
					strokeWidth={strokeWidth}
				/>
			)}
		</AnimatePresence>
	);
};
