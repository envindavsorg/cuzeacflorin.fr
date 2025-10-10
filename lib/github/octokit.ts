import { Octokit } from 'octokit';
import { PROFILE_CONFIG } from '@/resources/profile';

export const octokit = new Octokit({
	auth: process.env['GITHUB_TOKEN'],
	userAgent: `Mon portfolio - ${PROFILE_CONFIG.firstName} ${PROFILE_CONFIG.lastName}`,
	timeZone: 'UTC',
});
