export const slugify = (text: string, maxWords = 3): string => {
	const accentsMap: Record<string, string> = {
		à: 'a',
		á: 'a',
		ä: 'a',
		â: 'a',
		ã: 'a',
		å: 'a',
		æ: 'ae',
		ç: 'c',
		è: 'e',
		é: 'e',
		ê: 'e',
		ë: 'e',
		ì: 'i',
		í: 'i',
		î: 'i',
		ï: 'i',
		ñ: 'n',
		ò: 'o',
		ó: 'o',
		ô: 'o',
		õ: 'o',
		ö: 'o',
		œ: 'oe',
		ù: 'u',
		ú: 'u',
		û: 'u',
		ü: 'u',
		ý: 'y',
		ÿ: 'y',
	};

	const removeAccents = (str: string): string =>
		str.replace(
			/[àáäâãåæçèéêëìíîïñòóôõöœùúûüýÿ]/g,
			(char) => accentsMap[char] || char
		);

	return removeAccents(text)
		.trim()
		.toLowerCase()
		.replace(/['']/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
		.split('-')
		.slice(0, maxWords)
		.join('-');
};
