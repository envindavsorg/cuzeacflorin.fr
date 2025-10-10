import type { Registry } from 'shadcn/schema';
import { blocks } from './registry-blocks';
import { components } from './registry-components';
import { examples } from './registry-examples';
import { hook } from './registry-hook';
import { lib } from './registry-lib';

const registry: Registry = {
	name: 'envindavsorg',
	homepage: 'https://cuzeacflorin.fr/components',
	items: [
		...lib,
		...hook,
		...components,
		...blocks,
		// Internal use only
		...examples,
	],
};

export { registry };
export default registry;
