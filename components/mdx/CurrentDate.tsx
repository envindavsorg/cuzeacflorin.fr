'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

type CurrentDateProps = {
	format?: 'full' | 'short' | 'numeric' | 'custom';
	locale?: string;
	customFormat?: Intl.DateTimeFormatOptions;
	className?: string;
};

export const CurrentDate = ({
	format = 'full',
	locale = 'fr-FR',
	customFormat,
	className = '',
}: CurrentDateProps): React.JSX.Element => {
	const [currentDate, setCurrentDate] = useState<string>('');
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		const now = new Date();

		let options: Intl.DateTimeFormatOptions;

		if (customFormat) {
			options = customFormat;
		} else {
			switch (format) {
				case 'short':
					options = {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
					};
					break;
				case 'numeric':
					options = {
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
					};
					break;
				case 'full':
					options = {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					};
					break;
				default:
					options = { day: 'numeric', month: 'long', year: 'numeric' };
					break;
			}
		}

		const formatted = now.toLocaleDateString(locale, options);
		setCurrentDate(formatted);
	}, [format, locale, customFormat]);

	if (!isClient) {
		return <span className={className}>...</span>;
	}

	return <span className={className}>{currentDate}</span>;
};

export const Today = () => <CurrentDate format="full" locale="fr-FR" />;
export const TodayShort = () => <CurrentDate format="short" locale="fr-FR" />;
export const TodayEnglish = () => <CurrentDate format="full" locale="en-US" />;
