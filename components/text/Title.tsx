import type React from 'react';
import { Fragment, memo } from 'react';
import { cn } from '@/lib/utils';

type LetterProps = {
	text: string;
};

const Letters = memo(
	({ text }: LetterProps): React.JSX.Element => (
		<Fragment>
			{text.split('').map((char: string, idx: number) => (
				<span
					key={`letter-${char}-${idx + 1}`}
					className="inline-block"
					style={{ transitionDelay: `${idx * 25}ms` }}
				>
					{char === ' ' ? ' ' : char}
				</span>
			))}
		</Fragment>
	),
);

interface TitleProps {
	name: string;
	pronounce?: string;
	title?: string;
	subtitle?: string;
}

export const Title = memo(
	({ name, pronounce, subtitle, title }: TitleProps): React.JSX.Element => (
		<div className="flex-1">
			<h2
				className={cn(
					'flex flex-col gap-y-3',
					'font-bold font-pixelify-sans text-3xl transition-element md:text-4xl',
				)}
			>
				{title ? (
					<span className="group relative block overflow-hidden">
						<span className="group-hover:-translate-y-full inline-block text-theme transition-all duration-300 ease-in-out">
							<Letters text={name} />
						</span>
						<span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
							<Letters text={title} />
						</span>
					</span>
				) : (
					<span className="group-hover:-translate-y-full inline-block text-theme transition-all duration-300 ease-in-out">
						<Letters text={name} />
					</span>
				)}

				<span className="sr-only">{name}</span>
			</h2>
			{pronounce && (
				<p className="text-muted-foreground text-xs">
					- se prononce{' '}
					<span className="font-semibold">{pronounce}</span>
				</p>
			)}
			{subtitle && (
				<p className="text-muted-foreground text-xs">
					- <span className="font-semibold">{subtitle}</span>
				</p>
			)}
		</div>
	),
);

Title.displayName = 'Title';
