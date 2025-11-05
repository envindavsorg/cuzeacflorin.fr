# Development Guide

This guide provides instructions on how to set up and run the cuzeacflorin.fr project locally.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v20 or v22+ (required)
- [pnpm](https://pnpm.io/) v9+ (project uses pnpm 10.18.2)
- [Git](https://git-scm.com/)

### Tech Stack Overview

- **Next.js**: 15.5.4 with App Router and Turbopack
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Tailwind CSS**: v4
- **Linting**: Biome.js (ultracite config)
- **Port**: 1408 (not default 3000)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/envindavsorg/cuzeacflorin.fr.git portfolio
cd portfolio
```

### 2. Install dependencies

```bash
pnpm i
```

### 3. Configure Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Then, update the necessary environment variables inside `.env.local`.

### 4. Run the development server

```bash
pnpm dev
```

The application should now be available at http://localhost:1408

## Available Scripts

```bash
pnpm dev              # Start development server (port 1408 with Turbopack)
pnpm build            # Build for production with Turbopack
pnpm start            # Start production server
pnpm preview          # Build and preview locally

# Code Quality
pnpm lint             # Run Biome linter
pnpm lint:fix         # Fix linting issues automatically
pnpm check-types      # Run TypeScript type checking

# Registry
pnpm registry:internal:build  # Build registry internally
pnpm registry:build           # Build shadcn registry JSON files
```

## Building for Production

```bash
pnpm build
```

After building, start the application with:

```bash
pnpm start
```

Or build and preview:

```bash
pnpm preview
```

## Component Registry

This project features a **custom shadcn Registry** that allows you to distribute and reuse React components across multiple projects. The registry is hosted at https://cuzeacflorin.fr/r and provides easy installation of custom UI components.

### Available Components

The registry includes the following components authored by Florin Cuzeac (@envindavsorg):

1. **utils** - Utility functions for Tailwind class merging
2. **theme-switcher** - Theme switching component with system/light/dark modes
   - Dependencies: next-themes, @phosphor-icons/react, motion
3. **flip-sentences** - Animated text component that cycles through sentences
   - Dependencies: motion
4. **apple-hello-effect** - Apple-inspired writing effect (Bonjour, Hello, Hola)
   - Dependencies: motion

### Using Registry Components in Other Projects

Add components to your React project using the **shadcn CLI**:

```bash
npx shadcn@latest add @envindavsorg/utils
npx shadcn@latest add @envindavsorg/theme-switcher
npx shadcn@latest add @envindavsorg/flip-sentences
npx shadcn@latest add @envindavsorg/apple-hello-effect
```

> **Compatibility**: These components are built for [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4) and [React 19](https://react.dev/blog/2024/12/05/react-19).

### Component Documentation

- **Theme Switcher**: https://cuzeacflorin.fr/components/theme-switcher-component
- **Flip Sentences**: https://cuzeacflorin.fr/components/flip-sentences
- **Apple Hello Effect**: https://cuzeacflorin.fr/components/writing-effect-inspired-by-apple

### Registry Configuration

**Documentation**: [shadcn Registry Docs](https://ui.shadcn.com/docs/registry)

**Registry URL**: https://cuzeacflorin.fr/r

**Source Files**:
- `src/registry/` - Component source files
- `src/registry/registry-components.ts` - Component registry definitions
- `src/registry/registry-examples.ts` - Component examples
- `src/registry/registry-lib.ts` - Utility library definitions
- `src/config/registry.ts` - Registry configuration

**Auto-generated Files** (DO NOT EDIT):
- `src/__registry__/` - Generated component files
- `public/r/` - Public registry JSON files

### Building the Registry

Before deploying or testing the registry, build the registry files:

```bash
# Build internal registry structure
pnpm registry:internal:build

# Generate shadcn-compatible JSON files
pnpm registry:build
```

This generates the necessary JSON files in `public/r/` that shadcn CLI uses to download and install components.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Main routes (Accueil, Blog, Composants)
│   ├── (llms)/            # LLM-specific routes
│   ├── og/                # Open ContribGraph image generation
│   └── rss/               # RSS feed generation
├── components/            # Shared UI components
│   ├── ui/                # shadcn UI components
│   └── icons/             # Icon components
├── registry/              # Component registry source
│   ├── apple-hello-effect/
│   ├── flip-sentences/
│   ├── theme-switcher/
│   └── examples/
├── features/              # Feature-based modules
│   ├── blog/              # Blog functionality
│   ├── navigation/        # NavBar, Footer
│   ├── profile/           # User profile data
│   └── root/              # Root-level features
├── lib/                   # Utility libraries
├── hooks/                 # Custom React hooks
├── config/                # Configuration files
└── styles/                # Global styles
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# GitHub token (optional, for enhanced API rate limits)
GITHUB_TOKEN=your_github_token_here
```

## Code Style

- **Tabs** for indentation
- **Single quotes** for strings
- **80 character** line width
- **Semicolons** always
- Import aliases: `@/*` for `src/` imports
- Class merging: Use `cn()` from `@/lib/utils`

## Developer Information

**Author**: Florin Cuzeac
**Username**: @envindavsorg
**Email**: contact@cuzeacflorin.fr
**Website**: https://cuzeacflorin.fr
**GitHub**: https://github.com/envindavsorg
**Repository**: https://github.com/envindavsorg/cuzeacflorin.fr
**Position**: Développeur Front-End Senior @ WeFix by Fnac
**Location**: Paris, France
