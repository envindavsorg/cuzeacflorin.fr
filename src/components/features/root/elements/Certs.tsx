import type React from 'react';
import { BlogItemsLength } from '@/blog/elements/BlogItemsLength';
import { CollapsibleList } from '@/components/features/root/components/CollapsibleList';
import { CERTIFICATIONS } from '@/components/features/root/data/certifications';
import { CertItem } from '@/components/features/root/elements/CertsItem';
import {
	Panel,
	PanelContent,
	PanelHeader,
	PanelTitle,
} from '@/components/ui/Panel';
import { Prose } from '@/components/ui/Typography';

export const Certs = (): React.JSX.Element => (
	<Panel id="certs">
		<PanelHeader className="flex items-center justify-between">
			<PanelTitle>Mes certifications</PanelTitle>
			<BlogItemsLength items={CERTIFICATIONS} slug="obtenue" />
		</PanelHeader>

		<PanelContent className="screen-line-after">
			<Prose className="text-muted-foreground">
				La technologie évolue rapidement, et rester à jour est essentiel. Ces
				certifications valident mes compétences techniques et démontrent mon
				engagement envers l'excellence et l'apprentissage continu dans le
				développement web moderne.
			</Prose>
		</PanelContent>

		<CollapsibleList
			items={CERTIFICATIONS}
			max={2}
			renderItem={(item) => <CertItem certification={item} />}
		/>
	</Panel>
);
