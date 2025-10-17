import consola from 'consola';

const copyText = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		consola.error(`Could not copy text for ${text} !`);
	}
};

export default copyText;
