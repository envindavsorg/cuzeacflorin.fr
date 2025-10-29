'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/Command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/Popover';
import { cn } from '@/lib/utils';

type ComboboxProps = {
	data: {
		value: string;
		label: string;
	}[];
	onSelect(value: string): void;
	value?: string;
	disabled?: boolean;
};

export const Combobox = (props: ComboboxProps): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const selectedItem = props.data.find((item) => item.value === props.value);

	const setNewValue = (value: string) => {
		setOpen(false);
		props.onSelect(value);
	};

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger asChild>
				<Button
					aria-expanded={open}
					className="justify-between"
					disabled={props.disabled}
					role="combobox"
					variant="outline"
				>
					{selectedItem ? selectedItem.label : 'Select...'}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="h-auto p-0">
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList className="h-auto">
						<CommandEmpty>Nothing to see here.</CommandEmpty>
						<CommandGroup>
							{props.data.map((item) => (
								<CommandItem
									key={item.value}
									onSelect={() => setNewValue(item.value)}
									value={item.label}
								>
									{item.label}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											props.value === item.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
