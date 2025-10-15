import type React from 'react';
import { Providers } from '@/providers/Providers';
import linguiConfig from '../../../lingui.config';
import { allMessages } from '../appRouterI18n';
import { initLingui } from '../initLingui';
import { LinguiClientProvider } from './LinguiClientProvider';

export const generateStaticParams = async () =>
	linguiConfig.locales.map((lang) => ({ lang }));

type LangLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
};

const LangLayout = async ({ children, params }: LangLayoutProps) => {
	const { lang } = await params;
	initLingui(lang);

	return (
		<LinguiClientProvider
			initialLocale={lang}
			initialMessages={allMessages[lang]!}
		>
			<Providers>{children}</Providers>
		</LinguiClientProvider>
	);
};

export default LangLayout;
