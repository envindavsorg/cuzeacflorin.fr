'use server';

import { revalidateTag, unstable_cache } from 'next/cache';
import { octokit } from '@/lib/octokit';
import { GITHUB_QUERY } from './query/github.query';
import type { GitHubResponse, GitHubUserData } from './types/github.types';

const { GITHUB_USERNAME = '', GITHUB_REPO_NAME = '' } = process.env;

const CACHE_TAG = 'github-user-data';
const CACHE_REVALIDATE = 3600;

const fetchGitHubData = async (): Promise<GitHubUserData> => {
	const { user, repository } = await octokit.graphql<GitHubResponse>(
		GITHUB_QUERY,
		{ username: GITHUB_USERNAME, repoName: GITHUB_REPO_NAME }
	);

	return {
		login: user.login,
		name: user.name,
		avatar: user.avatarUrl,
		followers: user.followers.totalCount,
		following: user.following.totalCount,
		stars: user.repositories.nodes.reduce(
			(total, repo) => total + repo.stargazers.totalCount,
			0
		),
		branch: repository?.defaultBranchRef?.name,
		commit: {
			hash: repository?.defaultBranchRef?.target.oid.slice(0, 7),
			date: repository?.defaultBranchRef?.target.committedDate,
		},
	};
};

export const getGitHubUserData = unstable_cache(
	fetchGitHubData,
	[CACHE_TAG, GITHUB_USERNAME],
	{
		revalidate: CACHE_REVALIDATE,
		tags: [CACHE_TAG],
	}
);

export const revalidateGitHubData = async () => revalidateTag(CACHE_TAG);
