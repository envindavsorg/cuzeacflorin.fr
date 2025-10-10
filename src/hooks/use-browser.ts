import { useEffect, useState } from 'react';
import { type BrowserInfo, getBrowserInfo } from '@/lib/browser';

const useBrowser = () => {
	const [browser, setBrowser] = useState<BrowserInfo>({
		name: 'Inconnu',
		icon: null,
	});

	useEffect(() => {
		setBrowser(getBrowserInfo());
	}, []);

	return browser;
};

export default useBrowser;
