import { exec } from "node:child_process";
import { promisify } from "node:util";
import dayjs, { type Dayjs } from "dayjs";
import { unstable_cache } from "next/cache";
import "dayjs/locale/fr";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("fr");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const execAsync = promisify(exec);
const now: Dayjs = dayjs();

const formatGitDate = (timestamp: string): string => {
	const date: Dayjs = dayjs(timestamp);

	if (!date.isValid()) {
		return "Aucune mise à jour";
	}

	const isToday: boolean = date.isSame(now, "day");
	if (isToday) {
		return `Aujourd'hui à ${date.format("HH:mm")}`;
	}

	const isYesterday: boolean = date.isSame(now.subtract(1, "day"), "day");
	if (isYesterday) {
		return `Hier à ${date.format("HH:mm")}`;
	}

	if (date.isAfter(now.subtract(7, "day"))) {
		return date.fromNow();
	}

	return date.format("ddd DD MMM YYYY à HH:mm");
};

export type GitInfo = {
	hash: string;
	branch: string;
	date: string;
	timestamp: string;
};

const getGitInfo = async (): Promise<GitInfo> => {
	const [hash, branch, date] = await Promise.all([
		execAsync("git rev-parse --short HEAD"),
		execAsync("git rev-parse --abbrev-ref HEAD"),
		execAsync("git log -1 --pretty=%aI"),
	]);

	const timestamp = date.stdout.trim();

	console.log({
		hash: hash.stdout.trim(),
		branch: branch.stdout.trim(),
		date: formatGitDate(timestamp),
		timestamp,
	});

	return {
		hash: hash.stdout.trim(),
		branch: branch.stdout.trim(),
		date: formatGitDate(timestamp),
		timestamp,
	};
};

export const getCachedGitInfo = unstable_cache(getGitInfo, ["git-info"], {
	revalidate: false,
});
