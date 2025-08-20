import me from '@/images/me.webp';
import memoji1 from '@/images/memojis/memoji1.webp';
import memoji2 from '@/images/memojis/memoji2.webp';

const CURRENT_YEAR = new Date().getFullYear();
const START_DEV_YEAR = 2017;
const START_WORK_YEAR = 2019;

export const PROFILE_CONFIG = {
	firstName: 'Cuzeac',
	lastName: 'Florin',
	pronounce: 'ku-zé-ak flo-rin',
	welcome: 'crée, code, innove',
	genId: '@cuzeacflorin',

	experience: {
		years: CURRENT_YEAR - START_DEV_YEAR,
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

	avatars: [memoji1, memoji2],
} as const;
