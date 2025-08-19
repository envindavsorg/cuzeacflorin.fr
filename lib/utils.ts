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
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
