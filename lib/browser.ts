import type React from 'react';
import type { SVGProps } from 'react';
import { ArcIcon } from '@/components/icons/browsers/Arc';
import { ChromeIcon } from '@/components/icons/browsers/Chrome';
import { EdgeIcon } from '@/components/icons/browsers/Edge';
import { FirefoxIcon } from '@/components/icons/browsers/Firefox';
import { OperaIcon } from '@/components/icons/browsers/Opera';
import { SafariIcon } from '@/components/icons/browsers/Safari';

export type Browser =
	| 'Arc Browser'
	| 'Mozilla Firefox'
	| 'Google Chrome'
	| 'Safari'
	| 'Microsoft Edge'
	| 'Opera'
	| 'Inconnu';

export type BrowserInfo = {
	name: Browser;
	icon: ((props: SVGProps<SVGSVGElement>) => React.JSX.Element) | null;
};

const browserIcons: Record<Browser, BrowserInfo['icon']> = {
	'Arc Browser': ArcIcon,
	'Mozilla Firefox': FirefoxIcon,
	'Google Chrome': ChromeIcon,
	Safari: SafariIcon,
	'Microsoft Edge': EdgeIcon,
	Opera: OperaIcon,
	Inconnu: null,
};

const detectArc = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	const arcCSSVars = [
		'--arc-palette-background',
		'--arc-palette-foreground',
		'--arc-palette-focus',
		'--arc-palette-title',
		'--arc-palette-subtitle',
		'--arc-palette-maxContrastColor',
		'--arc-palette-minContrastColor',
		'--arc-background-gradient-color0',
		'--arc-background-gradient-color1',
		'--arc-background-gradient-color2',
		'--arc-background-gradient-overlay-color0',
	];

	const styles = getComputedStyle(document.documentElement);
	const arcVarCount = arcCSSVars.filter(
		(varName) => styles.getPropertyValue(varName).trim() !== ''
	).length;

	if (arcVarCount >= 2) {
		return true;
	}

	if (document.querySelector('[data-arc]')) {
		return true;
	}
	if (document.querySelector('arc-toolkit')) {
		return true;
	}
	if (document.querySelector('.arc-boost')) {
		return true;
	}

	const windowKeys = Object.keys(window);
	if (windowKeys.some((key) => key.toLowerCase().includes('arc'))) {
		return true;
	}

	if ('userAgentData' in navigator) {
		const uaData = navigator.userAgentData as {
			brands?: { brand: string; version: string }[];
		};

		if (
			uaData?.brands?.some((brand) =>
				brand.brand?.toLowerCase().includes('arc')
			)
		) {
			return true;
		}
	}

	if ('arc' in window) {
		return true;
	}

	return '__arc__' in window;
};

export const getBrowser = (): Browser => {
	if (typeof window === 'undefined') {
		return 'Inconnu';
	}

	if (detectArc()) {
		return 'Arc Browser';
	}

	const ua = navigator.userAgent;

	if (ua.includes('Firefox')) {
		return 'Mozilla Firefox';
	}

	if (ua.includes('Edg')) {
		return 'Microsoft Edge';
	}

	if (ua.includes('Opera') || ua.includes('OPR')) {
		return 'Opera';
	}

	if (ua.includes('Safari') && !ua.includes('Chrome')) {
		return 'Safari';
	}

	if (ua.includes('Chrome')) {
		return 'Google Chrome';
	}

	return 'Inconnu';
};

export const getBrowserInfo = (): BrowserInfo => {
	const name: Browser = getBrowser();

	return {
		name,
		icon: browserIcons[name],
	};
};
