import { Slot as SlotPrimitive } from 'radix-ui';
import type React from 'react';
import { cn } from '../../lib/utils';

const Slot = SlotPrimitive.Slot;

const Panel = ({
	className,
	...props
}: React.ComponentProps<'section'>): React.JSX.Element => (
	<section
		className={cn(
			'screen-line-before screen-line-after border-edge border-x',
			className
		)}
		data-slot="panel"
		{...props}
	/>
);

const PanelHeader = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div
		className={cn('screen-line-after px-4', className)}
		data-slot="panel-header"
		{...props}
	/>
);

const PanelTitle = ({
	className,
	asChild = false,
	...props
}: React.ComponentProps<'h2'> & { asChild?: boolean }): React.JSX.Element => {
	const Comp = asChild ? Slot : 'h2';

	return (
		<Comp
			className={cn('font-semibold text-xl sm:text-3xl', className)}
			data-slot="panel-title"
			{...props}
		/>
	);
};

const PanelContent = ({
	className,
	...props
}: React.ComponentProps<'div'>): React.JSX.Element => (
	<div className={cn('p-4', className)} data-slot="panel-body" {...props} />
);

export { Panel, PanelContent, PanelHeader, PanelTitle };
