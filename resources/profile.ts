import {
	KeyboardIcon,
	MonitorIcon,
	PaletteIcon,
} from '@phosphor-icons/react/dist/ssr';
import avatar from '@/images/avatar.webp';
import me from '@/images/me.webp';
import { withSequentialUIDs } from '@/lib/uid';

const CURRENT_YEAR = new Date().getFullYear();
const START_DEV_YEAR = 2017;
const START_WORK_YEAR = 2019;

export const PROFILE_CONFIG = {
	firstName: 'Cuzeac',
	lastName: 'Florin',
	pronounce: 'ku-zé-ak flo-rin',
	welcome: 'crée, code, innove',
	genId: '@cuzeacflorin',

	titles: withSequentialUIDs(
		[
			{
				label: 'développeur web',
				icon: KeyboardIcon,
			},
			{
				label: 'front-end',
				icon: MonitorIcon,
			},
			{
				label: 'designer UX / UI',
				icon: PaletteIcon,
			},
		],
		'title',
	),

	experience: {
		years: CURRENT_YEAR - START_DEV_YEAR,
	},

	location: {
		city: 'Paris',
		region: 'Île de France',
		country: 'France',
		coordinates: {
			latitude: 48.858093,
			longitude: 2.294694,
		},
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

	avatars: [me, avatar],
} as const;
