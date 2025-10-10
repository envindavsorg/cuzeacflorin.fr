import type { Registry } from 'shadcn/schema';

export const examples: Registry['items'] = [
	{
		name: 'apple-hello-effect-demo',
		type: 'registry:example',
		registryDependencies: ['@envindavsorg/apple-hello-effect'],
		files: [
			{
				path: 'examples/AppleHelloEffectDemo.tsx',
				type: 'registry:example',
			},
		],
	},
	{
		name: 'theme-switcher-demo',
		type: 'registry:example',
		registryDependencies: ['@envindavsorg/theme-switcher'],
		files: [
			{
				path: 'examples/ThemeSwitcherDemo.tsx',
				type: 'registry:example',
			},
		],
	},
	{
		name: 'flip-sentences-demo',
		type: 'registry:example',
		registryDependencies: ['@envindavsorg/flip-sentences'],
		files: [
			{
				path: 'examples/FlipSentencesDemo.tsx',
				type: 'registry:example',
			},
		],
	},
];
