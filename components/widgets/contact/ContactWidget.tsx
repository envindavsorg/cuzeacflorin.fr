import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import { Card } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';
import { ArticleLink } from '@/components/widgets/article/ArticleLink';
import { cn } from '@/lib/utils';
import { PROFILE_CONFIG } from '@/resources/profile';

const { contact, social } = PROFILE_CONFIG;

export const ContactWidget = memo(
	(): React.JSX.Element => (
		<Card
			className={cn(
				'relative justify-center gap-y-4 rounded-3xl p-8',
				'size-full select-none overflow-hidden md:cursor-grab md:active:cursor-grabbing',
				'shadow-xs transition-shadow duration-300 hover:shadow-sm'
			)}
		>
			<h2
				className="inline-block font-bold font-pixelify-sans text-2xl text-theme md:text-3xl"
				title="Un projet intéressant en tête ?"
			>
				Un projet intéressant en tête ?
			</h2>
			<Paragraph className="relative line-clamp-3 leading-relaxed max-sm:line-clamp-2 max-md:line-clamp-4">
				Si vous avez un projet à lancer, pensez avoir besoin de mon aide pour
				quelque chose ou simplement envie de dire bonjour, alors contactez-moi.
			</Paragraph>

			<div className="mt-2 inline-flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
				<div className="inline-flex gap-6">
					{social.map(({ name, url, icon: Icon }) => (
						<Link
							aria-label={name}
							href={url}
							key={name}
							rel="noreferrer"
							target="_blank"
						>
							<Icon className="size-7" />
							<span className="sr-only">{name}</span>
						</Link>
					))}
				</div>
				<ArticleLink
					label="N'hésitez pas à me contacter !"
					url={`mailto:${contact.email}`}
				/>
			</div>
		</Card>
	)
);
