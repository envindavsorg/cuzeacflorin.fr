import { type ComponentType, lazy, type SVGProps } from 'react';

export type Stack = {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
};

const BunIcon = lazy(() =>
	import('@/elements/icons/content/Bun').then((m) => ({
		default: m.BunIcon,
	}))
);
const CSSIcon = lazy(() =>
	import('@/elements/icons/content/CSS').then((m) => ({
		default: m.CSSIcon,
	}))
);
const ExpressIcon = lazy(() =>
	import('@/elements/icons/content/Express').then((m) => ({
		default: m.ExpressIcon,
	}))
);
const FastifyIcon = lazy(() =>
	import('@/elements/icons/content/Fastify').then((m) => ({
		default: m.FastifyIcon,
	}))
);
const FigmaIcon = lazy(() =>
	import('@/elements/icons/content/Figma').then((m) => ({
		default: m.FigmaIcon,
	}))
);
const MotionIcon = lazy(() =>
	import('@/elements/icons/content/Motion').then((m) => ({
		default: m.MotionIcon,
	}))
);
const GitIcon = lazy(() =>
	import('@/elements/icons/content/Git').then((m) => ({
		default: m.GitIcon,
	}))
);
const HTML5Icon = lazy(() =>
	import('@/elements/icons/content/HTML').then((m) => ({
		default: m.HTML5Icon,
	}))
);
const JavaScriptIcon = lazy(() =>
	import('@/elements/icons/content/JavaScript').then((m) => ({
		default: m.JavaScriptIcon,
	}))
);
const MarkdownIcon = lazy(() =>
	import('@/elements/icons/content/Markdown').then((m) => ({
		default: m.MarkdownIcon,
	}))
);
const MongoDBIcon = lazy(() =>
	import('@/elements/icons/content/MongoDB').then((m) => ({
		default: m.MongoDBIcon,
	}))
);
const NextJSIcon = lazy(() =>
	import('@/elements/icons/content/Next').then((m) => ({
		default: m.NextJSIcon,
	}))
);
const NodejsIcon = lazy(() =>
	import('@/elements/icons/content/Node').then((m) => ({
		default: m.NodejsIcon,
	}))
);
const NPMIcon = lazy(() =>
	import('@/elements/icons/content/NPM').then((m) => ({
		default: m.NPMIcon,
	}))
);
const PNPMIcon = lazy(() =>
	import('@/elements/icons/content/PNPM').then((m) => ({
		default: m.PNPMIcon,
	}))
);
const PostgreIcon = lazy(() =>
	import('@/elements/icons/content/Postgre').then((m) => ({
		default: m.PostgreIcon,
	}))
);
const PugIcon = lazy(() =>
	import('@/elements/icons/content/Pug').then((m) => ({
		default: m.PugIcon,
	}))
);
const ReactIcon = lazy(() =>
	import('@/elements/icons/content/React').then((m) => ({
		default: m.ReactIcon,
	}))
);
const SassIcon = lazy(() =>
	import('@/elements/icons/content/Sass').then((m) => ({
		default: m.SassIcon,
	}))
);
const TailwindIcon = lazy(() =>
	import('@/elements/icons/content/Tailwind').then((m) => ({
		default: m.TailwindIcon,
	}))
);
const TypeScriptIcon = lazy(() =>
	import('@/elements/icons/content/TypeScript').then((m) => ({
		default: m.TypeScriptIcon,
	}))
);
const VueIcon = lazy(() =>
	import('@/elements/icons/content/Vue').then((m) => ({
		default: m.VueIcon,
	}))
);

export const techStack: Stack[] = [
	{ icon: HTML5Icon, title: 'HTML5' },
	{ icon: CSSIcon, title: 'CSS' },
	{ icon: SassIcon, title: 'Sass' },
	{ icon: JavaScriptIcon, title: 'JavaScript' },
	{ icon: TypeScriptIcon, title: 'TypeScript' },
	{ icon: ReactIcon, title: 'React' },
	{ icon: NextJSIcon, title: 'Next.js' },
	{ icon: MongoDBIcon, title: 'MongoDB' },
	{ icon: ExpressIcon, title: 'Express' },
	{ icon: FastifyIcon, title: 'Fastify' },
	{ icon: MarkdownIcon, title: 'Markdown' },
	{ icon: TailwindIcon, title: 'Tailwind CSS' },
	{ icon: VueIcon, title: 'Vue' },
	{ icon: PugIcon, title: 'Pug' },
	{ icon: GitIcon, title: 'Git' },
	{ icon: NodejsIcon, title: 'Node.js' },
	{ icon: BunIcon, title: 'Bun' },
	{ icon: NPMIcon, title: 'npm' },
	{ icon: PNPMIcon, title: 'pnpm' },
	{ icon: FigmaIcon, title: 'Figma' },
	{ icon: MotionIcon, title: 'Framer Motion' },
	{ icon: PostgreIcon, title: 'PostgreSQL' },
];
