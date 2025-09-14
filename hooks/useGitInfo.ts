import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { GitInfo } from '@/lib/git';

export const useGitInfo = () => {
	const { data: gitInfo, error, isLoading } = useSWR<GitInfo>('/api/git', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		dedupingInterval: 60000, // Cache for 1 minute
		errorRetryCount: 3,
		errorRetryInterval: 1000,
	});

	return {
		gitInfo,
		error,
		isLoading,
		isValidating: isLoading
	};
};
