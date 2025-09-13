import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import dayjs from 'dayjs';
import { unstable_cache } from 'next/cache';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('fr');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const execAsync = promisify(exec);

export type GitInfo = {
	hash: string;
	branch: string;
	date: string;
	timestamp: string;
};

const formatGitDate = (dateString: string): string => {
	const date = dayjs(dateString);

	if (!date.isValid()) {
		return 'Date inconnue';
	}

	const now = dayjs();
	const isToday = date.isSame(now, 'day');
	const isYesterday = date.isSame(now.subtract(1, 'day'), 'day');

	if (isToday) {
		return `Aujourd'hui à ${date.format('HH:mm')}`;
	}
	if (isYesterday) {
		return `Hier à ${date.format('HH:mm')}`;
	}
	if (date.isAfter(now.subtract(7, 'day'))) {
		return date.fromNow();
	}

	return date.format('ddd DD MMM YYYY à HH:mm');
};

const getGitInfo = async (): Promise<GitInfo> => {
	if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
		const commitDate = process.env.VERCEL_GIT_COMMIT_DATE
			? new Date(
					Number.parseInt(process.env.VERCEL_GIT_COMMIT_DATE, 10) * 1000
				).toISOString()
			: new Date().toISOString();

		return {
			hash: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'unknown',
			branch: process.env.VERCEL_GIT_COMMIT_REF || 'main',
			date: formatGitDate(commitDate),
			timestamp: `(${dayjs().to(dayjs(commitDate))})`,
		};
	}

	try {
		const [hashResult, branchResult, dateResult] = await Promise.all([
			execAsync('git rev-parse --short HEAD'),
			execAsync('git rev-parse --abbrev-ref HEAD'),
			execAsync('git log -1 --pretty=%aI'),
		]);

		const timestamp = dateResult.stdout.trim();

		return {
			hash: hashResult.stdout.trim(),
			branch: branchResult.stdout.trim(),
			date: formatGitDate(timestamp),
			timestamp,
		};
	} catch {
		return {
			hash: 'dev',
			branch: 'local',
			date: formatGitDate(new Date().toISOString()),
			timestamp: new Date().toISOString(),
		};
	}
};

export const getCachedGitInfo = unstable_cache(getGitInfo, ['git-info'], {
	revalidate: false,
});
