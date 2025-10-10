import type React from 'react';
import { Panel, PanelHeader, PanelTitle } from '@/components/ui/Panel';
import { CollapsibleList } from '@/features/root/components/CollapsibleList';
import { CERTIFICATIONS } from '@/features/root/data/certifications';
import { CertificationItem } from './CertificationItem';

const CertificationsLength = (): React.JSX.Element => (
	<sup className="ml-1 select-none font-mono font-semibold text-sm text-theme">
		({CERTIFICATIONS.length})
	</sup>
);

export const Certifications = (): React.JSX.Element => (
	<Panel id="certs">
		<PanelHeader>
			<PanelTitle>
				Mes certifications
				<CertificationsLength />
			</PanelTitle>
		</PanelHeader>

		<CollapsibleList
			items={CERTIFICATIONS}
			max={2}
			renderItem={(item) => <CertificationItem certification={item} />}
		/>
	</Panel>
);
