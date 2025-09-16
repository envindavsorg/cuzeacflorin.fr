'use client';

import type React from 'react';
import { Footer } from '@/components/navigation/Footer';
import { NavBar } from '@/components/navigation/NavBar';
import useIsMounted from '@/hooks/useIsMounted';
import { cn } from '@/lib/utils';

type LayoutHomeProps = {
	children: React.ReactNode;
};

const LayoutHome = ({
	children,
}: Readonly<LayoutHomeProps>): React.JSX.Element => {
	const isMounted = useIsMounted();

	return (
		<>
			<NavBar />
			<div
				className={cn(
					'relative mx-auto flex w-full max-w-7xl flex-1 flex-col',
					'place-content-center transition-[opacity,_transform]',
					isMounted ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
				)}
			>
				{children}
			</div>
			<Footer />
		</>
	);
};

export default LayoutHome;
