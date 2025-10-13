import type { StaticImageData } from 'next/image';
import memoji1 from '@/images/memojis/memoji1.webp';
import memoji2 from '@/images/memojis/memoji2.webp';
import memoji3 from '@/images/memojis/memoji3.webp';
import memoji4 from '@/images/memojis/memoji4.webp';
import memoji5 from '@/images/memojis/memoji5.webp';

export type User = {
	firstName: string;
	lastName: string;
	displayName: string;
	username: string;
	gender: string;
	pronouns: string;
	bio: string;
	flipSentences: string[];
	address: string;
	location: {
		city: string;
		zoom: {
			max: number;
			min: number;
			default: number;
			step: number;
		};
		latitude: number;
		longitude: number;
	};
	phoneNumber: string;
	email: string;
	website: string;
	jobTitle: string;
	jobs: {
		title: string;
		company: string;
		website: string;
	}[];
	about: string;
	avatar: string;
	ogImage: string;
	namePronunciationUrl: string;
	avatars: StaticImageData[];
	keywords: string[];
	dateCreated: string;
};

export const USER: User = {
	firstName: 'Florin',
	lastName: 'Cuzeac',
	displayName: 'Florin',
	username: 'envindavsorg',
	gender: 'homme',
	pronouns: 'il/lui',
	bio: 'Crée, code, innove. Les petits détails comptent.',
	flipSentences: [
		'Imagine, code, crée, inspire.',
		'Chaque petit pixel compte !',
		'Chaque petit détail compte !',
		'Du concept au déploiement !',
	],
	address: 'Paris, France',
	location: {
		city: 'Paris',
		zoom: {
			max: 12,
			min: 3,
			default: 10,
			step: 0.5,
		},
		latitude: 48.858_093,
		longitude: 2.294_694,
	},
	phoneNumber: 'MDYgNTggMDUgODYgNjU=',
	email: 'Y29udGFjdEBjdXplYWNmbG9yaW4uZnI=',
	website: 'https://cuzeacflorin.fr',
	jobTitle: 'Développeur et designer web',
	avatar: '/images/avatar.webp',
	ogImage: '/images/og-image-dark.png?t=1755355653',
	namePronunciationUrl: '/audio/florin.mp3',
	avatars: [memoji1, memoji2, memoji3, memoji4, memoji5],
	jobs: [
		{
			title: 'Développeur Front-End Senior',
			company: 'WeFix by Fnac',
			website: 'https://wefix.net',
		},
	],
	about: `
Mon parcours a commencé simplement — un ami m'a montré comment créer un site web basique avec **HTML** et **CSS**. Au début, c'était de l'expérimentation pure. Je copiais du code depuis **Stack Overflow** sans totalement le comprendre. Mes premiers sites étaient bruts : des divs excessives, du **CSS** inline, aucune responsivité. **JavaScript** m'a défié pendant des semaines, particulièrement avec les ***callbacks*** et les ***promises***. J'ai dû relire les mêmes explications **10 fois** avant de comprendre. Mais voir le code prendre vie dans le navigateur était immédiatement gratifiant.

Un collègue m'a suggéré : ***"Essaie React, tu verras, c'est génial !"*** Initialement, je trouvais ça inutilement complexe. Après quelques projets, j'ai compris la valeur : plus de manipulation manuelle du **DOM**, les **composants réutilisables** sont devenus un vrai changement de paradigme. **TypeScript** a suivi peu après. J'étais sceptique jusqu'à perdre **3 heures** à déboguer une faute de frappe dans un nom de propriété. Désormais, coder sans **TypeScript** me semble incomplet — il détecte les erreurs avant qu'elles ne deviennent des problèmes.

**Next.js** a été transformateur. Plus d'heures à configurer **Webpack**. **Routing automatique**, **SSR**, **API routes** — tout prêt dès le départ. **Tailwind CSS** a d'abord divisé mon opinion. ***"Ça encombre le HTML"***, ***"Ce n'est pas maintenable"***. Une fois adapté, impossible de revenir en arrière. Finis les fichiers CSS de **2000 lignes** où personne ne savait ce qui servait encore.

Aujourd'hui, je construis des projets **Next.js/TypeScript/Tailwind** efficacement. Ce qui prenait **des jours** prend maintenant **des heures**. Les composants sont **optimisés**, le code est **propre**, les **performances** sont au top. Le meilleur ? Je continue d'apprendre quotidiennement : un **nouveau hook**, une **meilleure structure de composants**, une technique pour **réduire les re-renders**. Même après des années, voir le code se transformer en application fonctionnelle reste profondément satisfaisant.
  `,
	keywords: [
		'florin',
		'cuzeac',
		'cuzeac florin',
		'florin cuzeac',
		'envindavsorg',
		'dev',
		'developer',
		'web developer',
		'web designer',
		'front-end developer',
		'front-end designer',
		'freelance',
		'freelance developer',
		'freelance web developer',
		'freelance web designer',
		'freelance front-end developer',
		'freelance front-end designer',
		'paris',
		'france',
		'html',
		'css',
		'sass',
		'javascript',
		'typescript',
		'react',
		'nextjs',
		'tailwindcss',
		'nodejs',
		'npm',
		'pnpm',
		'postgresql',
		'pug',
		'vue',
		'git',
		'bun',
		'express',
		'fastify',
		'markdown',
		'mongodb',
	],
	dateCreated: '2025-09-01',
};
