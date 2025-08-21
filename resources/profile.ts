import {
	EnvelopeIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
	PhoneIcon,
} from '@phosphor-icons/react/dist/ssr';
import me from '@/images/me.webp';
import memoji1 from '@/images/memojis/memoji1.webp';
import memoji2 from '@/images/memojis/memoji2.webp';
import memoji3 from '@/images/memojis/memoji3.webp';
import memoji4 from '@/images/memojis/memoji4.webp';
import memoji5 from '@/images/memojis/memoji5.webp';

const CURRENT_YEAR = new Date().getFullYear();
const START_DEV_YEAR = 2017;
const START_WORK_YEAR = 2019;

export const PROFILE_CONFIG = {
	firstName: 'Cuzeac',
	lastName: 'Florin',
	pronounce: 'ku-zé-ak flo-rin',
	welcome: 'crée, code, innove',
	genId: '@cuzeacflorin',

	contact: {
		email: 'mail@cueacflorin.fr',
		phone: '06 58 05 86 65',
	},

	cv: {
		filePath: '/cv/cv-cuzeac-florin.pdf',
		title: 'CV - Cuzeac Florin',
		shareText:
			"Découvrez le profil de Florin Cuzeac, développeur full-stack avec 10 ans d'expérience !",
	},

	social: [
		{
			name: 'Github',
			url: 'https://github.com/envindavsorg/',
			icon: GithubLogoIcon,
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/cuzeacflorin/',
			icon: LinkedinLogoIcon,
		},
		{
			name: 'Téléphone',
			url: 'tel:+33658058665',
			icon: PhoneIcon,
		},
		{
			name: 'Adresse e-mail',
			url: 'mailto:mail@cuzeacflorin.fr',
			icon: EnvelopeIcon,
		},
	],

	experience: {
		years: CURRENT_YEAR - START_DEV_YEAR,
	},

	linkedin: {
		url: 'https://www.linkedin.com/in/cuzeacflorin/',
		handle: '@cuzeacflorin',
		label: 'Découvrez mon profil LinkedIn !',
	},

	github: {
		url: 'https://github.com/envindavsorg',
		handle: '@envindavsorg',
		label: 'Découvrez mon profil GitHub !',
	},

	location: {
		zoom: {
			max: 12,
			min: 3,
			default: 10,
			step: 0.5,
		},
		latitude: 48.858_093,
		longitude: 2.294_694,
	},

	work: {
		company: 'WeFix by Fnac & Darty',
		url: 'https://wefix.net/',
		experience: {
			years: CURRENT_YEAR - START_WORK_YEAR,
		},
	},

	image: {
		src: me,
		alt: 'Ma vraie photo de profil :)',
	},

	avatars: [memoji1, memoji2, memoji3, memoji4, memoji5],
} as const;
