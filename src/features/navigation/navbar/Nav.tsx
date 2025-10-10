import Link from 'next/link';
import type React from 'react';
import { cn } from '../../../lib/utils';

export type NavigationItem = {
	title: string;
	href: string;
};

export const NavItem = ({
	active,
	...props
}: React.ComponentProps<typeof Link> & {
	active?: boolean;
}) => (
	<Link
		className={cn(
			'font-medium font-mono text-muted-foreground text-sm transition-all duration-300',
			active && 'text-theme'
		)}
		{...props}
	/>
);

type NavProps = {
	items: NavigationItem[];
	activeId?: string;
	className?: string;
};

export const Nav = ({
	items,
	activeId,
	className,
}: NavProps): React.JSX.Element => (
	<nav
		className={cn('flex items-center gap-4', className)}
		data-active-id={activeId}
	>
		{items.map(({ title, href }) => {
			const active =
				activeId === href ||
				(href === '/'
					? ['/', '/index'].includes(activeId || '')
					: activeId?.startsWith(href));

			return (
				<NavItem active={active} href={href} key={href}>
					{title}
				</NavItem>
			);
		})}
	</nav>
);
