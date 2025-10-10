import { SOCIAL_LINKS } from '../../../../features/root/data/social-links';
import { techStack } from '../../../../features/root/data/tech-stack';
import { USER } from '../../../../features/root/data/user';

const content = `
# À propos de moi

${USER.about.trim()}

## Informations personnelles

- Prénom: ${USER.firstName}
- Nom: ${USER.lastName}
- Nom d'affichage: ${USER.displayName}
- Ville: ${USER.address}
- Site internet: ${USER.website}

## Réseaux sociaux

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join('\n')}

## Stack technique

${techStack.map((item) => `- [${item.title}]`).join('\n')}\n`;

export const dynamic = 'force-static';

export const GET = async (): Promise<Response> =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown;charset=utf-8',
		},
	});
