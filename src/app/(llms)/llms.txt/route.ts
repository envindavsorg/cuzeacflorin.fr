import { getAllPosts } from '@/blog/data/posts';
import type { Post } from '@/blog/types/post';
import { SITE_INFO } from '@/config/site';

const allPosts: Post[] = getAllPosts();

const content = `
# cuzeacflorin.fr

> Mon portfolio minimaliste, construit avec React, Next.js et Tailwind.css avec un registre de composants et un blog pour présenter mon travail en tant que développeur front-end.

- [À propos de moi](${SITE_INFO.url}/about.md): Un aperçu de qui je suis, mes compétences et ce que je fais.

- [Mes expériences professionnelles](${SITE_INFO.url}/experience.md): Mon parcours professionnel et les rôles que j'ai occupés.

- [Mes projets](${SITE_INFO.url}/projects.md): Une sélection de projets sur lesquels j'ai travaillé.

- [Mes certifications](${SITE_INFO.url}/certifications.md): Les certifications que j'ai obtenues.

## Blog et registre de composants

Je partage régulièrement des articles sur le développement front-end, les meilleures pratiques, et des tutoriels sur mon blog.

Voici une liste de mes articles récents :

${allPosts.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/blog/${item.slug}.mdx): ${item.metadata.description}`).join('\n')}
`;

export const dynamic = 'force-static';

export const GET = async (): Promise<Response> =>
	new Response(content, {
		headers: {
			'Content-Type': 'text/markdown;charset=utf-8',
		},
	});
