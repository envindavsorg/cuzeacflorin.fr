import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { Button } from '../../../../components/ui/Button';

export const metadata = {
	title: 'Page introuvable',
	description:
		'Oups ! Cette page n’existe pas, peut-être avez-vous cliqué sur un ancien lien ou avez-vous fait une faute de frappe.',
};

const NotFound = () => (
	<div className="flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center gap-y-4">
		<h1 className="font-medium font-mono text-8xl">404</h1>
		<p className="max-w-2xl text-balance text-center font-mono text-muted-foreground">
			Oups ! Cette page n’existe pas, peut-être avez-vous cliqué sur un ancien
			lien ou avez-vous fait une faute de frappe.
		</p>

		<Button asChild className="mt-3" variant="default">
			<Link aria-label="Retour en arrière" href="/">
				<ArrowLeftIcon className="size-5" />
				Retour en arrière
			</Link>
		</Button>
	</div>
);

export default NotFound;
