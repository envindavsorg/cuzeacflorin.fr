import type { Registry } from 'shadcn/schema';

export const lib: Registry['items'] = [
	{
		name: 'utils',
		type: 'registry:lib',
		title: 'Fonctions utilitaires',
		author: 'envindavsorg <contact@cuzeacflorin.fr>',
		dependencies: ['clsx', 'tailwind-merge'],
		files: [
			{
				path: 'src/lib/utils.ts',
				type: 'registry:lib',
			},
		],
	},
];
