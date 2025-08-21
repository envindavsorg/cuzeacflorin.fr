'use server';

import { unstable_cache } from 'next/cache';
import { logger } from '@/lib/logger';
import { octokit } from '@/lib/octokit';

const { GITHUB_USERNAME } = process.env;

// Type definitions
type GitHubUserData = {
	login: string;
	name: string;
	avatar: string;
	followers: number;
	following: number;
	stars: number;
	contributions: {
		totalContributions: number;
		latestContributions: Array<{
			contributionDays: Array<{
				color: string;
				contributionCount: number;
				date: string;
			}>;
		}>;
		maxContributionDay: {
			contributionCount: number;
			date: string;
			color: string;
		};
	};
	commits: {
		all: {
			contributionCalendar: {
				weeks: Array<{
					contributionDays: Array<{
						color: string;
						contributionCount: number;
						date: string;
					}>;
				}>;
				colors: string[];
			};
		};
	};
};

// Cache configuration
const CACHE_TAG = 'github-user-data';
const CACHE_REVALIDATE = 3600; // 1 hour in seconds
const MEMORY_CACHE_TTL = 60 * 1000; // 1 minute in milliseconds

// In-memory cache for edge runtime optimization
let memoryCache: { data: GitHubUserData | null; timestamp: number } = {
	data: null,
	timestamp: 0,
};

const fetchGitHubData = async (): Promise<GitHubUserData> => {
	const gql = String.raw;

	try {
		// Check in-memory cache first (for edge runtime)
		const now = Date.now();
		if (
			memoryCache.data &&
			now - memoryCache.timestamp < MEMORY_CACHE_TTL
		) {
			return memoryCache.data;
		}

		if (!GITHUB_USERNAME) {
			throw new Error('GitHub username not configured');
		}

		const { user } = await octokit.graphql<{
			user: {
				login: string;
				name: string;
				avatarUrl: string;
				followers: {
					totalCount: number;
				};
				following: {
					totalCount: number;
				};
				contributionsCollection: {
					contributionCalendar: {
						totalContributions: number;
						weeks: {
							contributionDays: {
								color: string;
								contributionCount: number;
								date: string;
							}[];
						}[];
					};
				};
				repositories: {
					totalCount: number;
					nodes: {
						stargazers: { totalCount: number };
					}[];
					pageInfo: {
						hasNextPage: boolean;
						endCursor: string | null;
					};
				};
			};
		}>(
			gql`
				query ($username: String!) {
					user(login: $username) {
						login
						name
						avatarUrl
						followers {
							totalCount
						}
						following {
							totalCount
						}
						contributionsCollection {
							contributionCalendar {
								totalContributions
								weeks {
									contributionDays {
										color
										contributionCount
										date
									}
								}
							}
						}
						repositories(ownerAffiliations: OWNER, first: 100) {
							totalCount
							nodes {
								stargazers {
									totalCount
								}
							}
							pageInfo {
								hasNextPage
								endCursor
							}
						}
					}
				}
			`,
			{ username: GITHUB_USERNAME },
		);

		// Process contribution data
		const weeklyContributions =
			user.contributionsCollection.contributionCalendar.weeks;

		let maxContributionDay = { contributionCount: 0, date: '', color: '' };

		for (const week of weeklyContributions) {
			for (const day of week.contributionDays) {
				if (
					day.contributionCount > maxContributionDay.contributionCount
				) {
					maxContributionDay = day;
				}
			}
		}

		const latestContributions = weeklyContributions.slice(-16);
		const totalContributions =
			user.contributionsCollection.contributionCalendar
				.totalContributions;

		const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

		const data: GitHubUserData = {
			login: user.login,
			name: user.name,
			avatar: user.avatarUrl,
			followers: user.followers.totalCount,
			following: user.following.totalCount,
			stars: user.repositories.nodes.reduce(
				(totalStars, repo) => totalStars + repo.stargazers.totalCount,
				0,
			),
			contributions: {
				totalContributions,
				latestContributions,
				maxContributionDay,
			},
			commits: {
				all: {
					contributionCalendar: {
						weeks: weeklyContributions,
						colors,
					},
				},
			},
		};

		// Update in-memory cache
		memoryCache = {
			data,
			timestamp: now,
		};

		return data;
	} catch (error) {
		logger.error('GitHub data fetch error:', error);

		// Return cached data if available, otherwise throw
		if (memoryCache.data) {
			return memoryCache.data;
		}

		// Return a fallback structure if no cache available
		throw new Error('Failed to fetch GitHub user data');
	}
};

// Cached version of the fetch function using Next.js unstable_cache
export const getGitHubUserData = unstable_cache(
	fetchGitHubData,
	[CACHE_TAG, GITHUB_USERNAME || 'default'],
	{
		revalidate: CACHE_REVALIDATE,
		tags: [CACHE_TAG],
	},
);

// Optional: Function to manually revalidate GitHub data
export async function revalidateGitHubData() {
	'use server';
	const { revalidateTag } = await import('next/cache');
	revalidateTag(CACHE_TAG);
}
