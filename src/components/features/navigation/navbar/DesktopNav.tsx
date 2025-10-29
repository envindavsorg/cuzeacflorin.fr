'use client';

import { usePathname } from 'next/navigation';
import { Nav, type NavigationItem } from './Nav';

type DesktopNavProps = {
	items: NavigationItem[];
};

export const DesktopNav = ({ items }: DesktopNavProps) => {
	const pathname = usePathname();

	return <Nav activeId={pathname} className="max-sm:hidden" items={items} />;
};
