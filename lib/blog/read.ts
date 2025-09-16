import { cache } from 'react';
import readingDuration from 'reading-duration';
import { CONSECUTIVE_DIGITS_PATTERN, WHITESPACE_SEPARATOR } from '@/lib/regex';

const TRANSLATIONS = {
	fr: { full: 'minutes', short: 'min' },
	en: { full: 'min read', short: 'min' },
} as const;

type Language = keyof typeof TRANSLATIONS;

type ReadingTimeOnArticle = {
	time: string;
	minutes: number;
	words: number;
};

export const readingTimeOnArticle = cache(
	(content: string, lang: Language = 'fr'): ReadingTimeOnArticle => {
		if (!content?.trim()) {
			return {
				time: `0 ${TRANSLATIONS[lang].full}`,
				minutes: 0,
				words: 0,
			};
		}

		const translation = TRANSLATIONS[lang];
		const duration = readingDuration(content, {
			wordsPerMinute: 100,
			emoji: false,
		});

		return {
			time: duration.replace('min read', translation.full),
			minutes: Number.parseInt(
				duration.match(CONSECUTIVE_DIGITS_PATTERN)?.[0] || '0',
				10
			),
			words: content.trim().split(WHITESPACE_SEPARATOR).length,
		};
	}
);
