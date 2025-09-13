import { NextResponse } from 'next/server';
import { type GitInfo, getCachedGitInfo } from '@/lib/git';

export const GET = async (): Promise<NextResponse<GitInfo>> => {
	try {
		const gitInfo = await getCachedGitInfo();
		return NextResponse.json(gitInfo);
	} catch (_error) {
		return NextResponse.json(
			{
				hash: 'inconnu',
				branch: '',
				date: 'pas de mise à jour',
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		);
	}
};
