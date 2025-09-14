import {
	EnvelopeIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
	PhoneIcon,
} from '@phosphor-icons/react/dist/ssr';
import memoji1 from '@/images/memoji1.webp';
import memoji2 from '@/images/memoji2.webp';
import memoji3 from '@/images/memoji3.webp';
import memoji4 from '@/images/memoji4.webp';
import memoji5 from '@/images/memoji5.webp';

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
		title: 'Envie de me dire bonjour ?',
		description:
			'Si vous avez un projet à lancer ou simplement envie de dire bonjour, alors contactez-moi. (je réponds vite !)',
		email: {
			name: 'E-mail',
			url: 'mailto:mail@cuzeacflorin.fr',
			icon: EnvelopeIcon,
			value: 'mail@cuzeacflorin.fr',
		},
		phone: {
			name: 'Téléphone',
			url: 'tel:+33658058665',
			icon: PhoneIcon,
			value: '06 58 05 86 65',
		},
	},

	cv: {
		filePath: '/cv/cv-cuzeac-florin.pdf',
		title: 'CV - Cuzeac Florin',
		shareText:
			"Découvrez le profil de Florin Cuzeac, développeur full-stack avec 10 ans d'expérience !",
	},

	experience: {
		years: CURRENT_YEAR - START_DEV_YEAR,
	},

	linkedin: {
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/cuzeacflorin/',
		handle: '@cuzeacflorin',
		label: 'Visiter !',
		icon: LinkedinLogoIcon,
	},

	github: {
		name: 'GitHub',
		url: 'https://github.com/envindavsorg',
		handle: '@envindavsorg',
		label: 'Visiter !',
		icon: GithubLogoIcon,
	},

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

	work: {
		company: 'WeFix by Fnac & Darty',
		url: 'https://wefix.net/',
		experience: {
			years: CURRENT_YEAR - START_WORK_YEAR,
		},
	},

	avatars: [memoji1, memoji2, memoji3, memoji4, memoji5],
} as const;
