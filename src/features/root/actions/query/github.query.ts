export const GITHUB_QUERY = `
    query ($username: String!, $repoName: String!) {
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
            repositories(ownerAffiliations: OWNER, first: 100) {
                nodes {
                    stargazers {
                        totalCount
                    }
                }
            }
        }
        repository(owner: $username, name: $repoName) {
            defaultBranchRef {
                name
                target {
                    ... on Commit {
                        oid
                        committedDate
                    }
                }
            }
        }
    }
`;
