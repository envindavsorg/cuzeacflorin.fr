import type React from 'react';
import { memo } from 'react';
import { getLinkedInFollowers } from '@/actions/linkedin.action';
import { Counter } from '@/components/ui/Counter';

export const DataContent = memo(async (): Promise<React.JSX.Element> => {
	const data = await getLinkedInFollowers();

	return (
		<Counter
			className="p-0 font-archivo-black font-bold text-4xl tabular-nums tracking-wide lg:text-5xl"
			interval={10}
			step={10}
			value={data.count}
		/>
	);
});

DataContent.displayName = 'DataContent';
