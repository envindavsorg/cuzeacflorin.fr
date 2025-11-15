import { cache } from 'react';

const WHITESPACE_SEPARATOR: RegExp = /\s+/;
const WORDS_PER_MINUTE = 150;

export const readingTime = cache((content: string): PostReadingTime => {
	const trimmedContent = content?.trim();

	if (!trimmedContent) {
		return {
			time: '0 min',
			minutes: 0,
			words: 0,
		};
	}

	const words = trimmedContent.split(WHITESPACE_SEPARATOR).length;
	const minutes = Math.ceil(words / WORDS_PER_MINUTE);
	const time = `${minutes} min`;

	return {
		time,
		minutes,
		words,
	};
});
