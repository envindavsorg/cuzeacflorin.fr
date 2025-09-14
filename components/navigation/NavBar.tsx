import type React from 'react';
import { ThemeSwitcher } from '@/components/widgets/ThemeSwitcher';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { firstName, lastName } = PROFILE_CONFIG;

export const NavBar = (): React.JSX.Element => (
	<div className="mx-auto flex w-full max-w-7xl items-center justify-between py-6">
		<h1>
			<span
				className={cn(
					'bg-clip-text font-base text-transparent text-xl tracking-tight sm:text-2xl lg:text-3xl',
					'bg-gradient-to-t from-theme via-theme to-theme'
				)}
			>
				{firstName} {lastName}
			</span>
		</h1>
		<ThemeSwitcher />
	</div>
);
