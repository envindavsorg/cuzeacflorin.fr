import { ShapesIcon } from '@phosphor-icons/react/ssr';
import type React from 'react';
import { ThemeSwitcher } from '@/components/widgets/ThemeSwitcher';

export const NavBar = (): React.JSX.Element => (
	<div className="mx-auto flex w-full max-w-7xl items-center justify-between py-6">
		<div className="flex items-center gap-x-3">
			<ShapesIcon className="size-6 fill-theme" />
			<h1 className="font-bold font-sans text-2xl">Mon portfolio</h1>
		</div>
		<ThemeSwitcher />
	</div>
);
