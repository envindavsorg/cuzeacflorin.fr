'use client';

import { type Messages, setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type React from 'react';
import { useState } from 'react';

type LinguiClientProviderProps = {
	children: React.ReactNode;
	initialLocale: string;
	initialMessages: Messages;
};

export const LinguiClientProvider = ({
	children,
	initialLocale,
	initialMessages,
}: LinguiClientProviderProps): React.JSX.Element => {
	const [i18n] = useState(() =>
		setupI18n({
			locale: initialLocale,
			messages: { [initialLocale]: initialMessages },
		})
	);

	return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
