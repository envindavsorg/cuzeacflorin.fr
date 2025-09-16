'use client';

import { XIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import LetterGlitch from '@/components/animation/LetterGlitch';
import { CardLink } from '@/components/ui/Card';
import { Paragraph } from '@/components/ui/Paragraph';

const NotFound = (): React.JSX.Element => {
	const router = useRouter();

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center gap-y-6 text-center">
			<LetterGlitch
				centerVignette={true}
				className="-z-10 fixed inset-0"
				glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
				glitchSpeed={50}
				outerVignette={true}
				smooth={true}
			/>

			<h1 className="sr-only">Page introuvable</h1>
			<Paragraph className="max-w-lg space-y-4">
				<span className="md:!text-8xl !text-7xl bg-gradient-to-t from-gray-100 to-gray-100/90 bg-clip-text font-bold text-transparent tracking-tight">
					404
				</span>
				<span className="block" />
				<span className="md:!text-xl !text-base bg-gradient-to-t from-gray-100 to-gray-100/90 bg-clip-text font-normal text-transparent tracking-tight">
					Oups ! Cette page n’existe pas, peut-être avez-vous cliqué sur un
					ancien lien ou avez-vous fait une faute de frappe.
				</span>
			</Paragraph>

			<CardLink
				action={() => router.back()}
				className="mt-3"
				icon={XIcon}
				label="Retour à l'accueil"
				rotate={false}
			/>
		</div>
	);
};

export default NotFound;
