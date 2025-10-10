import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import dayjs from 'dayjs';
import type React from 'react';
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';
import 'dayjs/locale/fr.js';
import Link from 'next/link';
import { VercelIcon } from '@/components/icons/content/Vercel';
import type { Certification } from '@/features/root/data/certifications';

dayjs.locale('fr');

const Icons = {
	vercel: (
		props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
	) => <VercelIcon {...props} />,
};

export const getIcon = (name: string | undefined) => {
	if (!(name && name in Icons)) {
		return null;
	}
	const Icon = Icons[name as keyof typeof Icons];
	return <Icon />;
};

type CertificationItemProps = {
	className?: string;
	certification: Certification;
};

export const CertificationItem = ({
	className,
	certification,
}: CertificationItemProps): React.JSX.Element => (
	<Link
		className={cn('group/cert flex items-center pr-4', className)}
		href={certification.credentialURL}
		rel="noopener"
		target="_blank"
	>
		<div
			aria-hidden
			className={cn(
				'mx-4 flex size-8 shrink-0 select-none items-center justify-center rounded-lg',
				'border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background',
				'bg-muted text-muted-foreground [&_svg]:size-4'
			)}
		>
			{getIcon(certification.issuerIconName)}
		</div>

		<div className="flex-1 space-y-1 border-edge border-l border-dashed p-4 pr-2">
			<h3 className="text-balance font-medium leading-snug underline-offset-4 group-hover/cert:underline sm:text-lg">
				{certification.title}
			</h3>

			<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm">
				<dl>
					<dt className="sr-only">Organisme ayant délivré la certification</dt>
					<dd className="italic">{certification.issuer}</dd>
				</dl>

				<Separator
					className="data-[orientation=vertical]:h-4"
					orientation="vertical"
				/>

				<dl>
					<dt className="sr-only">Date de délivrance</dt>
					<dd>
						<time dateTime={dayjs(certification.issueDate).toISOString()}>
							{dayjs(certification.issueDate).format('dddd, DD MMMM YYYY')}
						</time>
					</dd>
				</dl>
			</div>
		</div>

		{certification.credentialURL && (
			<ArrowUpRightIcon
				aria-hidden
				className="size-5 text-muted-foreground transition-transform duration-300 group-hover/cert:rotate-45 group-hover/cert:text-theme"
				weight="duotone"
			/>
		)}
	</Link>
);
