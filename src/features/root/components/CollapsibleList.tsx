import { CaretDownIcon } from '@phosphor-icons/react/ssr';
import { Slot as SlotPrimitive } from 'radix-ui';
import type React from 'react';
import { Button } from '@/components/ui/Button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/Collapsible';

const Slot = SlotPrimitive.Slot;

export const CollapsibleList = <T,>({
	items,
	max = 3,
	keyExtractor,
	renderItem,
}: {
	items: T[];
	max?: number;
	keyExtractor?: (item: T) => string;
	renderItem: (item: T) => React.ReactNode;
}): React.JSX.Element => (
	<Collapsible>
		{items.slice(0, max).map((award, index) => (
			<Slot
				className="border-edge border-b"
				key={typeof keyExtractor === 'function' ? keyExtractor(award) : index}
			>
				{renderItem(award)}
			</Slot>
		))}

		<CollapsibleContent>
			{items.slice(max).map((award, index) => (
				<Slot
					className="border-edge border-b"
					key={
						typeof keyExtractor === 'function'
							? keyExtractor(award)
							: max + index
					}
				>
					{renderItem(award)}
				</Slot>
			))}
		</CollapsibleContent>

		{items.length > max && (
			<div className="flex justify-center py-2 md:justify-end md:pr-4">
				<CollapsibleTrigger asChild>
					<Button className="group/collapsible-trigger flex" variant="default">
						<span className="hidden group-data-[state=closed]/collapsible-trigger:block">
							Afficher plus
						</span>
						<span className="hidden group-data-[state=open]/collapsible-trigger:block">
							Afficher moins
						</span>

						<CaretDownIcon
							aria-hidden
							className="transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible-trigger:rotate-180"
						/>
					</Button>
				</CollapsibleTrigger>
			</div>
		)}
	</Collapsible>
);
