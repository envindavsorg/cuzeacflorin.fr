import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
	WHITESPACE_AND_HYPHEN_SEPARATOR,
	WHITESPACE_SEPARATOR,
} from "@/lib/regex";
import { baseURL } from "@/resources/meta";

export const cn = (...inputClasses: ClassValue[]): string =>
	twMerge(clsx(inputClasses));

export const absoluteUrl = (path: string): string =>
	`https://${baseURL}${path}`;

type GetInitialsOptions = {
	maxInitials?: number;
	fallback?: string;
	handleHyphens?: boolean;
};

export const getInitials = (
	fullName: string,
	{
		maxInitials = 2,
		fallback = "?",
		handleHyphens = false,
	}: GetInitialsOptions = {},
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
		.join("");

	return initials || fallback;
};
