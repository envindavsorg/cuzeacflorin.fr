'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type CurrentDateProps = {
	format?: 'full' | 'short' | 'numeric' | 'custom' | 'weekday';
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
				case 'weekday':
					options = {
						weekday: 'short',
					};
					break;
				default:
					options = {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					};
					break;
			}
		}

		const formatted = now.toLocaleDateString(locale, options);
		setCurrentDate(formatted);
	}, [format, locale, customFormat]);

	if (!isClient) {
		return <span className={cn('font-sans', className)}>...</span>;
	}

	return <span className={cn('font-sans', className)}>{currentDate}</span>;
};
