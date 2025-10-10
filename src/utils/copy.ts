import { logger } from '@/lib/logger';

const copyText = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		logger.error(`Could not copy text for ${text}`);
	}
};

export default copyText;
