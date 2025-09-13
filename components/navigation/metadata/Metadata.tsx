import dayjs from 'dayjs';
import type React from 'react';
import { memo } from 'react';
import 'dayjs/locale/fr.js';
import { Browser } from '@/components/navigation/metadata/modules/Browser';
import { Commit } from '@/components/navigation/metadata/modules/Commit';
import { Resolution } from '@/components/navigation/metadata/modules/Resolution';
import { Time } from '@/components/navigation/metadata/modules/Time';
import { Update } from '@/components/navigation/metadata/modules/Update';

dayjs.locale('fr');

export type MetadataProps = {
	intersect: boolean;
};

export const Metadata = memo(
	({ intersect }: MetadataProps): React.JSX.Element => (
		<div className="flex flex-col gap-y-3">
			<h2 className="font-semibold text-sm text-theme">Meta-données :</h2>
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
				<Browser intersect={intersect} />
				<Commit intersect={intersect} />
				<Time intersect={intersect} />
				<Resolution intersect={intersect} />
				<Update intersect={intersect} />
			</div>
		</div>
	)
);
