# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

USE ALWAYS PNPM for any commands and not NPM !!!
when you use a library or for any command, first check the docs with use context7

## Common Development Commands

### Development
```bash
# Start development server with Turbo
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Code Quality
```bash
# Run linter
npm run lint

# Format code with Biome
npx biome format --write .

# Check formatting without writing
npx biome check .

# Format with auto-fixes
npx biome check --write .
```

### Dependency Management
```bash
# Install dependencies (uses pnpm)
pnpm install

# Update dependencies
pnpm taze

# Add new dependency
pnpm add [package-name]
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.4 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animation**: Motion (Framer Motion successor)
- **Code Formatter**: Biome (replaces ESLint + Prettier)
- **Package Manager**: pnpm
- **Language**: TypeScript with strict mode

### TimeClock Structure

#### Content System
- MDX-based content in `/content/posts` and `/content/projects`
- Dynamic routes: `/app/(content)/posts/[slug]` and `/app/(content)/projects/[slug]`
- Frontmatter parsing in `/utils/mdx.ts` for metadata extraction
- Server-side rendering with static generation via `generateStaticParams`

#### Component Architecture
- **Grid System**: Responsive grid layout using `react-grid-layout` with breakpoint-specific configurations
- **Widget Components**: Modular widgets in `/components/grid/widgets/` (ArticleWidget, ContactWidget, AboutMe, LinkedIn, MapLocation, TimeClock, CV, ThemeSwitcher)
- **UI Components**: Reusable UI elements in `/components/ui/` with Radix UI integration
- **Icon System**: Technology-specific icons in `/components/icons/content/`

#### Styling System
- Tailwind CSS v4 with custom configuration
- CSS custom properties for theming
- Dark/light mode support via `next-themes`
- Custom fonts loaded via `/lib/fonts.ts` (Geist Sans, Geist Mono, Pixelify Sans)
- Utility classes managed through `cn()` helper in `/lib/utils.ts`

#### Data Flow
- Site configuration centralized in `/config/site.ts` and `/config/socials.ts`
- Profile and metadata in `/resources/`
- Grid layouts defined in `/lib/grid.ts` with responsive breakpoints (lg, md, sm)
- External data fetching (CV, WorkWidget) via SWR and Octokit

### Important Configuration

#### Biome Configuration
- Tab indentation
- Single quotes
- Semicolons required
- Tailwind class sorting enabled
- Security rule: `noDangerouslySetInnerHtml` disabled

#### Next.js Configuration
- MDX support enabled
- Image optimization for WorkWidget avatars and cuzeacflorin.fr
- Security headers configured (X-Frame-Options, CSP, etc.)
- Console statements removed in production (except errors/warnings)
- Package optimization for key libraries

#### TypeScript
- Path alias: `@/*` maps to root directory
- Strict mode enabled
- Module resolution: bundler

### Key Patterns

#### Component Development
- Use functional components with TypeScript interfaces
- Leverage the existing widget pattern for grid items
- Follow the established icon component pattern for new technology icons
- Use the `cn()` utility for conditional class names

#### Content Management
- Place MDX files in `/content/posts/` or `/content/projects/`
- Include required frontmatter: title, description, date (for posts) or links (for projects)
- Images for projects go in `/public/projects/[project-name]/`

#### Animation & Interaction
- Use Motion library for animations (imported from 'motion')
- Sparkles animation system available via `/components/animation/Sparkles.tsx`
- Responsive interactions handled through grid layout system

#### Performance Considerations
- Lazy loading for analytics and non-critical components
- Image optimization with WebP/AVIF formats
- Experimental webpack build worker enabled
- Package imports optimized in next.config.ts
