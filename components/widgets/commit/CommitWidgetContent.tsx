import type React from 'react';
import { memo } from 'react';
import { getGitHubUserData } from '@/actions/github.action';
import { Counter } from '@/components/ui/Counter';

export const CommitWidgetContent = memo(
	async (): Promise<React.JSX.Element> => {
		const { contributions } = await getGitHubUserData();

		return (
			<Counter
				className="font-bold font-pixelify-sans text-theme text-xl md:text-3xl"
				interval={10}
				value={contributions.totalContributions}
			>
				<span className="ms-1 text-lg md:text-xl">commits</span>
			</Counter>
		);
	},
);

CommitWidgetContent.displayName = 'CommitWidgetContent';
