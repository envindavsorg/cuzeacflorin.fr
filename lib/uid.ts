/**
 * Generates a unique identifier based on timestamp and random values
 * @param prefix - Optional prefix for the UID
 * @returns A unique identifier string
 */
export const generateUID = (prefix = ''): string => {
	const timestamp = Date.now().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 9);
	return prefix
		? `${prefix}-${timestamp}-${randomPart}`
		: `${timestamp}-${randomPart}`;
};

/**
 * Generates a short unique identifier (useful for React keys)
 * @returns A short unique identifier string
 */
export const generateShortUID = (): string =>
	Math.random().toString(36).substring(2, 11);

/**
 * Generates a numeric UID based on timestamp and random number
 * @returns A numeric unique identifier
 */
export const generateNumericUID = (): number => {
	const timestamp = Date.now();
	const random = Math.floor(Math.random() * 1000);
	return timestamp * 1000 + random;
};

/**
 * Creates a UID generator with a counter for sequential IDs
 * @param prefix - Optional prefix for the UIDs
 * @returns A function that generates sequential UIDs
 */
export const createUIDGenerator = (prefix = 'id') => {
	let counter = 0;
	return () => {
		counter++;
		const timestamp = Date.now().toString(36);
		return `${prefix}-${timestamp}-${counter}`;
	};
};

/**
 * Generates UIDs for an array of items
 * @param items - Array of items to add UIDs to
 * @param uidKey - The key name for the UID (default: 'id')
 * @returns Array with UIDs added to each item
 */
export const withUIDs = <T extends Record<string, any>>(
	items: T[],
	uidKey = 'id',
): Array<T & { [key: string]: string }> =>
	items.map((item) => ({
		...item,
		[uidKey]: generateUID(),
	}));

/**
 * Generates sequential UIDs for an array of items
 * @param items - Array of items to add UIDs to
 * @param prefix - Prefix for the UIDs
 * @returns Array with sequential UIDs added to each item
 */
export const withSequentialUIDs = <T extends Record<string, any>>(
	items: T[],
	prefix = 'item',
): Array<T & { uid: string }> => {
	const generator = createUIDGenerator(prefix);
	return items.map((item) => ({
		...item,
		uid: generator(),
	}));
};
