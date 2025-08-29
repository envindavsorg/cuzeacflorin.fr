'use client';

import type React from 'react';
import useMounted from '@/hooks/useMounted';
import { cn } from '@/lib/utils';

type ContentProps = {
	children: React.ReactNode;
	className?: string;
};

const Content = ({
	children,
	className,
}: Readonly<ContentProps>): React.JSX.Element => {
	const isMounted = useMounted();

	return (
		<div
			className={cn(
				isMounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0',
				'transition-[opacity,_transform] duration-700',
				className
			)}
		>
			{children}
		</div>
	);
};

type TemplatePageProps = {
	children: React.ReactNode;
};

const TemplatePage = ({
	children,
}: Readonly<TemplatePageProps>): React.JSX.Element => (
	<Content>{children}</Content>
);

export default TemplatePage;
