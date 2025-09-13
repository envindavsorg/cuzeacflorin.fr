import type React from 'react';
import { useMemo } from 'react';
import { BentoClientSimple } from '@/components/blocs/BentoClientSimple';
import { gridItems } from '@/lib/grid';

type BentoProps = {
	className?: string;
};

export const Bento = ({
	className,
}: Readonly<BentoProps>): React.JSX.Element => {
	// Mémoriser les éléments de grille pour stabilité des enfants
	const children = useMemo(
		() =>
			gridItems.map((item) => {
				const Component = item.component;
				return (
					<div id={item.i} key={item.i}>
						<Component />
					</div>
				);
			}),
		[]
	);

	return (
		<BentoClientSimple className={className}>{children}</BentoClientSimple>
	);
};
