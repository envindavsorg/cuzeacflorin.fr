import { execSync } from 'node:child_process';

export const getGitCommitHash = (short = true): string => {
	try {
		const command = short ? 'git rev-parse --short HEAD' : 'git rev-parse HEAD';
		return execSync(command).toString().trim();
	} catch {
		return 'aucun commit';
	}
};

export const getGitCommitDate = (): string => {
	try {
		return execSync('git log -1 --pretty=%ad').toString().trim();
	} catch {
		return 'aucune mise à jour';
	}
};
