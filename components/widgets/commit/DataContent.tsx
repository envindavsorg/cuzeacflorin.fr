import type React from 'react';
import { memo } from 'react';
import { getGitHubUserData } from '@/actions/github.action';
import { Counter } from '@/components/ui/Counter';

export const DataContent = memo(async (): Promise<React.JSX.Element> => {
	const { contributions } = await getGitHubUserData();

	return (
		<Counter
			className="font-extrabold text-xl md:text-3xl"
			interval={10}
			value={contributions.totalContributions}
		>
			<span className="font-bold text-base md:text-lg">commits</span>
		</Counter>
	);
});

DataContent.displayName = 'DataContent';
