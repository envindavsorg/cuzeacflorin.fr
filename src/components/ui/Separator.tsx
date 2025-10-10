'use client';

import { Separator as SeparatorPrimitive } from 'radix-ui';
import type React from 'react';
import { cn } from '../../lib/utils';

const Separator = ({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>): React.JSX.Element => (
	<SeparatorPrimitive.Root
		className={cn(
			'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
			className
		)}
		data-slot="separator"
		decorative={decorative}
		orientation={orientation}
		{...props}
	/>
);

export { Separator };
