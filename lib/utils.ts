import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { baseURL } from '@/resources/meta';

export const cn = (...inputClasses: ClassValue[]): string =>
	twMerge(clsx(inputClasses));

export const absoluteUrl = (path: string): string =>
	`https://${baseURL}${path}`;

export const toKebabCase = (string: string): string =>
	string
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-+)|(-+$)/g, '');

export const formatDate = (date: string): string =>
	new Date(date).toLocaleDateString('fr-FR', {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

export const WORDS_REGEX: RegExp = /\s+/;
export const extractSentence = (text: string): string => {
	const beforeColon = text.split(':')[0];
	const words = beforeColon.trim().split(WORDS_REGEX);
	return words
		.filter((_, index) => index !== 1 && index !== words.length - 1)
		.join(' ');
};
