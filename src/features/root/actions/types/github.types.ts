export type GitHubUserData = {
	login: string;
	name: string;
	avatar: string;
	followers: number;
	following: number;
	stars: number;
	branch: string | undefined;
	commit: {
		hash: string | undefined;
		date: string | undefined;
	};
};

export type GitHubResponse = {
	user: {
		login: string;
		name: string;
		avatarUrl: string;
		followers: { totalCount: number };
		following: { totalCount: number };
		repositories: {
			nodes: { stargazers: { totalCount: number } }[];
		};
	};
	repository: {
		defaultBranchRef: {
			name: string;
			target: {
				oid: string;
				committedDate: string;
			};
		} | null;
	} | null;
};
