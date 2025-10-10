import type { StaticImageData } from 'next/image';
import githubImage from '@/images/github.webp';
import linkedinImage from '@/images/linkedin.webp';
import mailImage from '@/images/mail.webp';
import phoneImage from '@/images/phone.webp';

export type SocialLinksProps = {
	icon: StaticImageData;
	title: string;
	handle: string;
	description?: string;
	href: string;
};

export const SOCIAL_LINKS: SocialLinksProps[] = [
	{
		icon: linkedinImage,
		title: 'LinkedIn',
		handle: '@cuzeacflorin',
		description: 'Retrouvez-moi sur LinkedIn !',
		href: 'https://linkedin.com/in/cuzeacflorin',
	},
	{
		icon: githubImage,
		title: 'GitHub',
		handle: '@envindavsorg',
		description: 'Retrouvez-moi sur GitHub !',
		href: 'https://github.com/envindavsorg',
	},
	{
		icon: mailImage,
		title: 'Adresse e-mail',
		handle: 'contact@cuzeacflorin.fr',
		description: 'Envoyez-moi un e-mail !',
		href: 'mailto:contact@cuzeacflorin.fr',
	},
	{
		icon: phoneImage,
		title: 'Numéro de téléphone',
		handle: '06 58 05 86 65',
		description: 'Appelez-moi !',
		href: 'tel:+33658058665',
	},
];
