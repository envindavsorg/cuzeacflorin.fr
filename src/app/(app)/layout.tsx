import { getStatus, type StatusResponse } from '@openstatus/react';
import dynamic from 'next/dynamic';
import type React from 'react';
import { Sparkles } from '@/elements/animations/Sparkles';
import { Footer } from '@/features/navigation/Footer';
import { NavBar } from '@/features/navigation/NavBar';
import { getGitHubUserData } from '@/features/root/actions/github.action';

const RootContextMenu = dynamic(() =>
	import('@/features/context/RootContextMenu').then(
		(mod) => mod.RootContextMenu
	)
);

const ScrollTop = dynamic(() =>
	import('@/features/layout/ScrollTop').then((mod) => mod.ScrollTop)
);

export type AppLayoutProps = {
	children: React.ReactNode;
};

const AppLayout = async ({ children }: Readonly<AppLayoutProps>) => {
	const { branch, commit } = await getGitHubUserData();
	const { hash, date } = commit;

	const status: StatusResponse = await getStatus(
		process.env.OPENSTATUS_SLUG || 'cuzeacflorin-fr'
	);

	return (
		<>
			<NavBar />
			<RootContextMenu>
				<main className="max-w-screen overflow-x-hidden px-2">{children}</main>
			</RootContextMenu>
			<Sparkles density={150} />
			<Footer commit={{ branch, hash, update: date }} status={status} />
			<ScrollTop />
		</>
	);
};

export default AppLayout;
