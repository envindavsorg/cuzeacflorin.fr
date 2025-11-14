import type React from 'react';
import { Divider } from '@/components/ui/Divider';

type DocsLayoutProps = {
	children: React.ReactNode;
};

const DocsLayout = ({
	children,
}: Readonly<DocsLayoutProps>): React.JSX.Element => (
	<div className="mx-auto border-edge border-x md:max-w-3xl">
		<Divider />

		{children}
	</div>
);

export default DocsLayout;
