import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import { useMemo } from 'react';
import { DynamicIcon } from '@/components/icons/Loader';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-lg border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
				secondary: 'border bg-zinc-50 text-muted-foreground dark:bg-zinc-900',
				destructive:
					'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
				outline:
					'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

const Badge = ({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			className={cn(badgeVariants({ variant }), className)}
			data-slot="badge"
			{...props}
		/>
	);
};

type BadgeWithIconProps = {
	type: 'react' | 'next' | 'ts' | 'tailwind';
};

const BADGE_CONFIG = {
	react: { iconName: 'react', label: 'React 19+' },
	next: { iconName: 'next', label: 'Next 15+' },
	ts: { iconName: 'typescript', label: 'TypeScript 5+' },
	tailwind: { iconName: 'tailwind', label: 'Tailwind 4+' },
} as const;

const BadgeWithIcon = ({ type }: BadgeWithIconProps): React.JSX.Element => {
	const { iconName, label } = useMemo(
		() => BADGE_CONFIG[type] || { iconName: null, label: '' },
		[type]
	);

	if (!iconName) {
		return <Badge>{label}</Badge>;
	}

	return (
		<Badge
			className="inline-flex items-center gap-1.5 py-1.5 align-middle"
			variant="secondary"
		>
			<DynamicIcon className="size-4 shrink-0" name={iconName} />
			<span className="leading-none">{label}</span>
		</Badge>
	);
};

export { Badge, BadgeWithIcon, badgeVariants };
