import type React from 'react';
import { memo } from 'react';
import { getGitHubUserData } from '@/actions/github.action';
import { Counter } from '@/components/ui/Counter';

export const DataContent = memo(async (): Promise<React.JSX.Element> => {
	const { contributions } = await getGitHubUserData();

	return (
		<Counter
			className="p-0 font-archivo-black font-bold text-4xl tabular-nums tracking-wide lg:text-5xl"
			interval={10}
			value={contributions.totalContributions}
		/>
	);
});

DataContent.displayName = 'DataContent';
