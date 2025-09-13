import dayjs from 'dayjs';
import type React from 'react';
import { memo } from 'react';
import 'dayjs/locale/fr.js';
import { Browser } from '@/components/navigation/metadata/modules/Browser';
import { Commit } from '@/components/navigation/metadata/modules/Commit';
import { Resolution } from '@/components/navigation/metadata/modules/Resolution';
import { Time } from '@/components/navigation/metadata/modules/Time';
import { Update } from '@/components/navigation/metadata/modules/Update';
import { cn } from '@/lib/utils';

dayjs.locale('fr');

export type MetadataProps = {
	intersect: boolean;
};

export const Metadata = memo(
	({ intersect }: MetadataProps): React.JSX.Element => (
		<div className="flex flex-col border-border border-b">
			<h2 className="w-fit border-border border-x border-t px-3 py-1.5 font-semibold text-sm text-theme">
				Meta-données :
			</h2>
			<div
				className={cn(
					'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
					'divide-x divide-border border-border border-x border-t max-lg:divide-y',
					'*:px-3 *:py-2'
				)}
			>
				<div>
					<Browser intersect={intersect} />
				</div>
				<div className="max-md:border-r-0">
					<Commit intersect={intersect} />
				</div>
				<div className="max-md:border-r-1 max-lg:border-r-0">
					<Time intersect={intersect} />
				</div>
				<div className="max-md:border-r-0 max-md:border-b-1 max-lg:border-b-0">
					<Resolution intersect={intersect} />
				</div>
				<div className="max-sm:col-span-full">
					<Update intersect={intersect} />
				</div>
			</div>
		</div>
	)
);

Metadata.displayName = 'Metadata';
