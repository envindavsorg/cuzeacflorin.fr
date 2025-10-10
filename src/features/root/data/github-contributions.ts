import type { Activity } from '@/components/ui/ContributionGraph';
import { GITHUB_USERNAME } from '@/config/site';

type GitHubContributionsResponse = {
	contributions: Activity[];
};

export const getGitHubContributions = async () => {
	const res = await fetch(
		`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=2025`,
		{ next: { revalidate: 86_400 } }
	);
	const data = (await res.json()) as GitHubContributionsResponse;
	return data.contributions;
};
