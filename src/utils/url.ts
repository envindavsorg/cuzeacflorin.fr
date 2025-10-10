const INVALID_FILENAME_CHARACTERS_REGEX = /(^\w+:|^)\/\//;

export const urlToName = (url: string) =>
	url.replace(INVALID_FILENAME_CHARACTERS_REGEX, '');

export const addQueryParams = (
	urlString: string,
	query: Record<string, string>
): string => {
	try {
		const url = new URL(urlString);
		for (const [key, value] of Object.entries(query)) {
			url.searchParams.set(key, value);
		}

		return url.toString();
	} catch {
		return urlString;
	}
};

export const getAbsoluteUrl = (url: string): string => {
	if (url.startsWith('http')) {
		return url;
	}

	if (typeof window !== 'undefined') {
		return new URL(url, window.location.origin).toString();
	}

	return url;
};
