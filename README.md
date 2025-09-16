<p align="center">
	<a href="https://www.cuzeacflorin.fr/">
		<img src="https://www.cuzeacflorin.fr/avatar.webp" alt="Cuzeac Florin" height="96">
    	<h3 align="center">Portfolio - Cuzeac Florin</h3>
  	</a>
</p>

<p align="center">
  Create. Develop. Imagine.
</p>

> A modern and interactive portfolio built with Next.js 15, TypeScript, and an innovative widget-based architecture.

- **Live Demo**: [cuzeacflorin.fr](https://cuzeacflorin.fr/)
- **Performance**: Perfect Lighthouse 100/100 across all metrics

---

## ✨ Features

### **Interactive Widgets**
- **TimeClockWidget** : Real-time clock with smooth animations
- **GitHub Stats** : Live stars and commits via API
- **LinkedIn Followers** : Professional statistics
- **Interactive Map** : Geolocation with Mapbox GL
- **Theme Switcher** : Dark/light mode with persistence

### **Modern Architecture**
- **Next.js 15.5** with App Router and React 19
- **Responsive grid system** with 4 adaptive layouts
- **Zustand state management** with devtools and persistence
- **Strict TypeScript** with optimized path mapping
- **Dynamic MDX** with Shiki syntax highlighting

### **Design & Animation**
- **Tailwind CSS v4** with CSS Custom Properties
- **Motion** (ex-Framer Motion) for animations
- **Number Flow** for numeric transitions
- **Noise Canvas** custom grain effect
- **Responsive design** across mobile/tablet/desktop

---

## 🛠 Tech Stack

### Frontend
- **Framework** : Next.js 15.5 + React 19
- **Language** : TypeScript 5.9
- **Styling** : Tailwind CSS v4 + PostCSS
- **State Management** : Zustand with devtools
- **Animations** : Motion, @number-flow/react, tsparticles

### Tooling & Performance
- **Package Manager** : pnpm 10.14
- **Linting** : Biome 2.2.0 (replaces ESLint + Prettier)
- **Build Tool** : Turbopack for development
- **Bundle Analysis** : ultracite
- **Dependency Updates** : taze

### Integrations
- **Maps** : Mapbox GL + react-map-gl
- **Data Fetching** : SWR + Octokit for GitHub
- **Content** : MDX with rehype plugins
- **Analytics** : Vercel Analytics + Speed Insights
- **Deployment** : Vercel with automatic optimizations

---

## 🚦 Performance

```bash
# Lighthouse Scores
Performance: 💯 100/100
Accessibility: 💯 100/100
Best Practices: 💯 100/100
SEO: 💯 100/100
```

### Implemented Optimizations
- **Images** : Next.js Image with WebP/AVIF formats
- **Fonts** : Preloading with next/font (Geist Sans, Geist Mono, Pixelify Sans)
- **Bundle** : Automatic code splitting + tree shaking
- **Caching** : React cache() + SWR for API calls
- **Compression** : Gzip/Brotli via Vercel

---

## 🏃‍♂️ Installation & Usage

### Prerequisites
- Node.js 18+
- pnpm (recommended)

### Installation
```bash
# Clone the repository
git clone https://github.com/envindavsorg/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev --turbo
```

### Available Scripts
```bash
pnpm dev          # Dev server with Turbopack 🚀
pnpm build        # Optimized production build
pnpm start        # Start production server
pnpm lint         # Linting and formatting with Biome
pnpm biome check --write .  # Auto-fix code
pnpm taze         # Update dependencies
```

---

## 🏗 Project Architecture

```
portfolio/
├── app/                          # Next.js 15 App Router
│   ├── (content)/               # Content pages (posts, projects)
│   ├── api/                     # API routes (GitHub, LinkedIn)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Main layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── animation/               # Animation components
│   │   ├── Noise.tsx           # Canvas grain effect
│   │   ├── Sparkles.tsx        # tsParticles particles
│   │   └── Motion/             # Motion animations
│   ├── widgets/                 # Interactive widgets
│   │   ├── TimeClockWidget.tsx       # Real-time clock
│   │   ├── GitHubStats.tsx     # GitHub API stats
│   │   ├── MapLocation.tsx     # Mapbox map
│   │   └── ...
│   ├── ui/                      # Reusable UI components
│   └── mdx/                     # MDX components
├── content/                     # MDX content
│   ├── posts/                   # Blog articles
│   └── projects/                # Project showcases
├── lib/                         # Utilities and configurations
│   ├── grid.ts                 # Responsive grid configuration
│   ├── mdx.ts                  # MDX parser + frontmatter
│   └── utils.ts                # TypeScript utilities
├── stores/                      # Zustand stores
│   └── time.store.ts           # Real-time state management
└── hooks/                       # Custom hooks
    ├── useClockSync.ts         # Clock synchronization
    └── useBreakpoint.ts        # Responsive breakpoints
```

---

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
GITHUB_TOKEN=your_github_token
LINKEDIN_API_TOKEN=your_linkedin_token
```

### Biome Configuration
```json
{
  "formatter": {
    "indentStyle": "tab",
    "lineWidth": 100
  },
  "linter": {
    "rules": {
      "style": {
        "useImportType": "error",
        "useExportType": "error"
      },
      "nursery": {
        "useSortedClasses": "error"
      }
    }
  }
}
```

---

## 💡 Advanced Technical Features

### Modular Widget System
```tsx
// Each widget is a self-contained component
export const TimeClockWidget = memo(() => {
  const { hours, minutes } = useTimeParts();
  const showSeparator = useShowSeparator();

  useClockSync(); // Real-time hook

  return (
    <Card>
      <AnimatedNumber value={hours} />
      <ClockSeparator show={showSeparator} />
      <AnimatedNumber value={minutes} />
    </Card>
  );
});
```

### Adaptive Responsive Grid
```tsx
// 4 different layouts based on context
export const layouts = {
  all: {    // Default layout
    lg: [{ i: 'clock', x: 3, y: 0, w: 1, h: 1 }],
    md: [{ i: 'clock', x: 0, y: 2, w: 1, h: 1 }],
    sm: [{ i: 'clock', x: 1, y: 2, w: 1, h: 1 }]
  },
  about: {  // About page layout
    // Specific configuration...
  }
};
```

### Optimized Zustand Store
```tsx
const useTimeStore = create()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        time: new Date(),
        updateTime: () => set({ time: new Date() }),
        // Derived hooks to avoid re-renders
        getTimeParts: () => {
          const { time } = get();
          return {
            hours: time.getHours(),
            minutes: time.getMinutes()
          };
        }
      }))
    )
  )
);
```

---

## 📱 Responsive Design

| Breakpoint | Width | Description |
|------------|-------|-------------|
| `sm` | < 768px | Mobile portrait |
| `md` | 768px - 1024px | Tablet |
| `lg` | > 1024px | Desktop |

Each widget automatically adapts with specific layouts to optimize user experience.

---

## 🤝 Contributing

### Local Development
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use **Biome** for automatic formatting
- Follow **strict TypeScript** conventions
- Follow existing component patterns
- Test your changes across all 3 breakpoints

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js** for the incredible framework
- **Vercel** for hosting and performance tools
- **Tailwind CSS** for the design system
- **Mapbox** for interactive maps
- **GitHub API** for repository statistics

---

<div align="center">

**Built with ❤️ by [Florin Cuzeac](https://cuzeacflorin.fr)**

[Website](https://cuzeacflorin.fr) • [LinkedIn](https://linkedin.com/in/florin-cuzeac) • [GitHub](https://github.com/envindavsorg)

</div>
