import {
	CoffeeIcon,
	CopyrightIcon,
	HeartIcon,
} from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { CurrentDate } from '@/components/elements/CurrentDate';
import { Paragraph } from '@/components/ui/Paragraph';
import { cn } from '@/lib/utils';

type FooterProps = {
	firstName: string;
	lastName: string;
};

export const Footer = ({
	firstName,
	lastName,
}: FooterProps): React.JSX.Element => (
	<footer>
		<div
			className={cn(
				'relative mx-auto flex w-full flex-col items-center justify-center gap-y-2 px-6 pt-12 lg:px-8',
				'max-w-[320px] sm:max-w-[375px] md:max-w-[800px] lg:max-w-[1200px]'
			)}
		>
			<Paragraph className="flex items-center gap-x-2 text-center leading-relaxed">
				<CopyrightIcon /> <CurrentDate className="font-bold" format="yearly" />{' '}
				{`${firstName} ${lastName}`}
			</Paragraph>
			<Paragraph className="!text-muted-foreground flex items-center gap-x-2 text-center text-xs leading-relaxed md:text-sm">
				Construit avec <HeartIcon className="text-red-600 dark:text-red-300" />{' '}
				et <CoffeeIcon className="text-amber-600 dark:text-amber-300" /> à
				Paris.
			</Paragraph>
		</div>
	</footer>
);
