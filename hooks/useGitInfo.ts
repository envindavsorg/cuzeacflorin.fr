import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { GitInfo } from '@/lib/git';

export const useGitInfo = () => {
	const { data: gitInfo, error } = useSWR<GitInfo>('/api/git', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return { gitInfo, error };
};
