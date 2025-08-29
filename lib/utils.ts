import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
	WHITESPACE_AND_HYPHEN_SEPARATOR,
	WHITESPACE_SEPARATOR,
} from '@/lib/regex';
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

type GetInitialsOptions = {
	maxInitials?: number;
	fallback?: string;
	handleHyphens?: boolean;
};

export const getInitials = (
	fullName: string,
	{
		maxInitials = 2,
		fallback = '?',
		handleHyphens = false,
	}: GetInitialsOptions = {}
): string => {
	if (!fullName?.trim()) {
		return fallback;
	}

	const separator = handleHyphens
		? WHITESPACE_AND_HYPHEN_SEPARATOR
		: WHITESPACE_SEPARATOR;

	const initials = fullName
		.trim()
		.split(separator)
		.filter(Boolean)
		.slice(0, maxInitials)
		.map((word) => word[0]?.toUpperCase())
		.filter(Boolean)
		.join('');

	return initials || fallback;
};
