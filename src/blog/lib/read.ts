import { cache } from 'react';
import readingDuration from 'reading-duration';

const WHITESPACE_SEPARATOR: RegExp = /\s+/;
const CONSECUTIVE_DIGITS_PATTERN = /\d+/;

type ReadingTimeOnArticle = {
	time: string;
	minutes: number;
	words: number;
};

export const readingTime = cache((content: string): ReadingTimeOnArticle => {
	if (!content?.trim()) {
		return { time: 'pas de lecture', minutes: 0, words: 0 };
	}

	const duration = readingDuration(content, {
		wordsPerMinute: 100,
		emoji: false,
	});

	const time = duration.replace('min read', 'min');

	const minutes = Number.parseInt(
		duration.match(CONSECUTIVE_DIGITS_PATTERN)?.[0] || '0',
		10
	);

	const words = content.trim().split(WHITESPACE_SEPARATOR).length;

	return {
		time,
		minutes,
		words,
	};
});
