import { cache } from 'react';
import readingDuration from 'reading-duration';
import { CONSECUTIVE_DIGITS_PATTERN, WHITESPACE_SEPARATOR } from '@/lib/regex';

const CONFIG = {
	wordsPerMinute: 100,
	emoji: false,
} as const;

const TRANSLATIONS = {
	fr: {
		full: 'minutes',
		short: 'min',
	},
	en: {
		full: 'min read',
		short: 'min',
	},
} as const;

type Language = keyof typeof TRANSLATIONS;

type ReadingTimeResult = {
	readingTime: string;
	readingTimeShort: string;
	minutes: number;
	words: number;
};

export const readingTimeOnArticle = cache(
	(content: string, lang: Language = 'fr'): ReadingTimeResult => {
		if (!content?.trim()) {
			return {
				readingTime: `0 ${TRANSLATIONS[lang].full}`,
				readingTimeShort: `0 ${TRANSLATIONS[lang].short}`,
				minutes: 0,
				words: 0,
			};
		}

		const duration = readingDuration(content, CONFIG);

		const minutes = Number.parseInt(
			duration.match(CONSECUTIVE_DIGITS_PATTERN)?.[0] || '0',
			10
		);
		const words = content.trim().split(WHITESPACE_SEPARATOR).length;

		const translation = TRANSLATIONS[lang];
		const readingTime = duration.replace('min read', translation.full);
		const readingTimeShort = duration.replace('min read', translation.short);

		return {
			readingTime,
			readingTimeShort,
			minutes,
			words,
		};
	}
);

export const getWordCount = (content: string): number => {
	if (!content?.trim()) {
		return 0;
	}
	return content.trim().split(WHITESPACE_SEPARATOR).length;
};

export const formatReadingTime = (
	minutes: number,
	lang: Language = 'fr'
): string => {
	if (minutes <= 1) {
		return `1 ${TRANSLATIONS[lang].short}`;
	}
	if (minutes > 30) {
		return `30+ ${TRANSLATIONS[lang].short}`;
	}
	return `${minutes} ${TRANSLATIONS[lang].short}`;
};
