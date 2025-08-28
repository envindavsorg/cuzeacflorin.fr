'use client';

import { XIcon } from '@phosphor-icons/react';
import type React from 'react';
import LetterGlitch from '@/components/animation/LetterGlitch';
import { CardLink } from '@/components/ui/Card';

const NotFound = (): React.JSX.Element => {
	return (
		<>
			<div className="-z-10 fixed inset-0">
				<LetterGlitch
					centerVignette={true}
					glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
					glitchSpeed={50}
					outerVignette={true}
					smooth={true}
				/>
			</div>

			<main className="relative flex min-h-screen flex-col items-center justify-center gap-y-6 px-6 text-center">
				<h1 className="font-pixelify-sans text-8xl md:text-[180px]">404</h1>
				<div className="flex w-full max-w-xl flex-col gap-y-3">
					<h2 className="font-bold text-3xl md:text-4xl">Page introuvable</h2>
					<p className="text-sm text-white leading-relaxed md:text-base">
						Oups ! Cette page n’existe pas, peut-être avez-vous cliqué sur un
						ancien lien ou avez-vous fait une faute de frappe.
					</p>
				</div>
				<CardLink
					className="mt-3"
					icon={XIcon}
					label="Retour à l'accueil"
					rotate={false}
					url="/"
				/>
			</main>
		</>
	);
};

export default NotFound;
