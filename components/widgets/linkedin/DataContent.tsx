import type React from 'react';
import { memo } from 'react';
import { getLinkedInFollowers } from '@/actions/linkedin.action';
import { Counter } from '@/components/ui/Counter';

export const DataContent = memo(async (): Promise<React.JSX.Element> => {
	const data = await getLinkedInFollowers();

	return (
		<Counter
			className="font-extrabold text-xl md:text-3xl"
			interval={10}
			step={10}
			value={data.count}
		>
			<span className="font-bold text-base md:text-lg">abonnés</span>
		</Counter>
	);
});

DataContent.displayName = 'DataContent';
