import { lazy } from 'react';
import { Button } from '@/components/Button';

const V0Icon = lazy(() =>
	import('../../icons/content/V0').then((m) => ({
		default: m.V0Icon,
	}))
);

type OpenInV0Props = {
	url: string;
};

export const OpenInV0 = ({ url }: OpenInV0Props) => (
	<Button
		asChild
		className="not-prose gap-1 font-sans"
		size="sm"
		variant="secondary"
	>
		<a
			aria-label="Ouvrir dans v0"
			href={`https://v0.app/chat/api/open?url=${url}`}
			rel="noopener noreferrer"
			target="_blank"
		>
			Ouvrir dans
			<V0Icon className="size-5" />
		</a>
	</Button>
);
