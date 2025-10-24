import type React from 'react';
import { type ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
	({ className, type, ...props }, ref): React.JSX.Element => (
		<input
			className={cn(
				'flex h-10 w-full px-3 py-2',
				'rounded-md border border-input bg-background ring-offset-background',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm',
				'text-base placeholder:text-muted-foreground md:text-sm',
				className
			)}
			ref={ref}
			type={type}
			{...props}
		/>
	)
);
