import type { RehypeShikiOptions } from '@shikijs/rehype';

export const shikiOptions: RehypeShikiOptions = {
	themes: {
		light: 'github-light',
		dark: 'github-dark',
	},
	defaultColor: false,
	cssVariablePrefix: '--shiki-',
	transformers: [
		{
			name: 'add-language-class',
			code(node) {
				this.addClassToHast(node, `language-${this.options.lang}`);
			},
		},
	],
};

export const rehypeOptions = {
	theme: {
		light: 'github-light',
		dark: 'github-dark',
	},
};
