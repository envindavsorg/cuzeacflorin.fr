# 🚀 Portfolio - Cuzeac Florin

> Un portfolio moderne et interactif construit avec Next.js 15, TypeScript, et une architecture widget-based innovante.

![Portfolio Preview](./public/og.png)

**🌍 Live Demo**: [cuzeacflorin.fr](https://cuzeacflorin.fr/)
**📊 Performance**: Lighthouse 100/100 sur tous les critères

---

## ✨ Fonctionnalités

### 🎯 **Widgets Interactifs**
- **TimeClock** : Horloge temps réel avec animations fluides
- **GitHub Stats** : Stars et commits en temps réel via API
- **LinkedIn Followers** : Statistiques professionnelles
- **Carte Interactive** : Géolocalisation avec Mapbox GL
- **Theme Switcher** : Mode sombre/clair avec persistance

### 🏗️ **Architecture Moderne**
- **Next.js 15.5** avec App Router et React 19
- **Système de grille responsive** avec 4 layouts adaptatifs
- **Gestion d'état Zustand** avec devtools et persistance
- **TypeScript strict** avec path mapping optimisé
- **MDX dynamique** avec syntax highlighting Shiki

### 🎨 **Design & Animation**
- **Tailwind CSS v4** avec CSS Custom Properties
- **Motion** (ex-Framer Motion) pour les animations
- **Number Flow** pour les transitions numériques
- **Noise Canvas** effet grain personnalisé
- **Design responsive** sur mobile/tablette/desktop

---

## 🛠 Stack Technique

### Frontend
- **Framework** : Next.js 15.5 + React 19
- **Language** : TypeScript 5.9
- **Styling** : Tailwind CSS v4 + PostCSS
- **State Management** : Zustand avec devtools
- **Animations** : Motion, @number-flow/react, tsparticles

### Tooling & Performance
- **Package Manager** : pnpm 10.14
- **Linting** : Biome 2.2.0 (remplace ESLint + Prettier)
- **Build Tool** : Turbopack pour le dev
- **Bundler Analysis** : ultracite
- **Dependency Updates** : taze

### Intégrations
- **Maps** : Mapbox GL + react-map-gl
- **Data Fetching** : SWR + Octokit pour GitHub
- **Content** : MDX avec rehype plugins
- **Analytics** : Vercel Analytics + Speed Insights
- **Deployment** : Vercel avec optimisations automatiques

---

## 🚦 Performance

```bash
# Lighthouse Scores
Performance: 💯 100/100
Accessibility: 💯 100/100
Best Practices: 💯 100/100
SEO: 💯 100/100
```

### Optimisations Implémentées
- **Images** : Next.js Image avec WebP/AVIF
- **Fonts** : Preload avec next/font (Geist Sans, Geist Mono, Pixelify Sans)
- **Bundle** : Code splitting automatique + tree shaking
- **Caching** : React cache() + SWR pour les API calls
- **Compression** : Gzip/Brotli côté Vercel

---

## 🏃‍♂️ Installation & Usage

### Prérequis
- Node.js 18+ 
- pnpm (recommandé)

### Installation
```bash
# Clone le repository
git clone https://github.com/envindavsorg/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev --turbo
```

### Scripts Disponibles
```bash
pnpm dev          # Dev server avec Turbopack 🚀
pnpm build        # Build optimisé pour production
pnpm start        # Start production server
pnpm lint         # Linting et formatting avec Biome
pnpm biome check --write .  # Auto-fix du code
pnpm taze         # Update des dépendances
```

---

## 🏗 Architecture du Projet

```
portfolio/
├── app/                          # Next.js 15 App Router
│   ├── (content)/               # Pages de contenu (posts, projets)
│   ├── api/                     # API routes (GitHub, LinkedIn)
│   ├── globals.css              # Styles globaux
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Page d'accueil
├── components/
│   ├── animation/               # Composants d'animation
│   │   ├── Noise.tsx           # Effet grain canvas
│   │   ├── Sparkles.tsx        # Particules tsparticles
│   │   └── Motion/             # Animations Motion
│   ├── widgets/                 # Widgets interactifs
│   │   ├── TimeClock.tsx       # Horloge temps réel
│   │   ├── GitHubStats.tsx     # Stats GitHub API
│   │   ├── MapLocation.tsx     # Carte Mapbox
│   │   └── ...
│   ├── ui/                      # Composants UI réutilisables
│   └── mdx/                     # Composants MDX
├── content/                     # Contenu MDX
│   ├── posts/                   # Articles de blog
│   └── projects/                # Projets showcase
├── lib/                         # Utilitaires et configurations
│   ├── grid.ts                 # Configuration grille responsive
│   ├── mdx.ts                  # Parser MDX + frontmatter
│   └── utils.ts                # Utilitaires TypeScript
├── stores/                      # Stores Zustand
│   └── time.store.ts           # Gestion état temps réel
└── hooks/                       # Hooks personnalisés
    ├── useClockSync.ts         # Synchronisation horloge
    └── useBreakpoint.ts        # Breakpoints responsive
```

---

## 🔧 Configuration

### Variables d'Environnement
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

## 💡 Fonctionnalités Techniques Avancées

### Système de Widgets Modulaire
```tsx
// Chaque widget est un composant autonome
export const TimeClock = memo(() => {
  const { hours, minutes } = useTimeParts();
  const showSeparator = useShowSeparator();
  
  useClockSync(); // Hook temps réel
  
  return (
    <Card pattern>
      <AnimatedNumber value={hours} />
      <ClockSeparator show={showSeparator} />
      <AnimatedNumber value={minutes} />
    </Card>
  );
});
```

### Grille Responsive Adaptive
```tsx
// 4 layouts différents selon le contexte
export const layouts = {
  all: {    // Layout par défaut
    lg: [{ i: 'clock', x: 3, y: 0, w: 1, h: 1 }],
    md: [{ i: 'clock', x: 0, y: 2, w: 1, h: 1 }],
    sm: [{ i: 'clock', x: 1, y: 2, w: 1, h: 1 }]
  },
  about: {  // Layout page à propos
    // Configuration spécifique...
  }
};
```

### Store Zustand Optimisé
```tsx
const useTimeStore = create()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        time: new Date(),
        updateTime: () => set({ time: new Date() }),
        // Hooks dérivés pour éviter les re-renders
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

| Breakpoint | Largeur | Description |
|------------|---------|-------------|
| `sm` | < 768px | Mobile portrait |
| `md` | 768px - 1024px | Tablette |
| `lg` | > 1024px | Desktop |

Chaque widget s'adapte automatiquement avec des layouts spécifiques pour optimiser l'expérience utilisateur.

---

## 🤝 Contribution

### Développement Local
1. Fork le repository
2. Crée une branche feature : `git checkout -b feature/amazing-feature`
3. Commit tes changements : `git commit -m 'Add amazing feature'`
4. Push vers la branche : `git push origin feature/amazing-feature`
5. Ouvre une Pull Request

### Code Style
- Utilise **Biome** pour le formatting automatique
- Respecte les conventions **TypeScript strict**
- Suis les patterns existants pour les composants
- Teste tes modifications sur les 3 breakpoints

---

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **Next.js** pour le framework incredible
- **Vercel** pour l'hébergement et les outils de performance
- **Tailwind CSS** pour le système de design
- **Mapbox** pour les cartes interactives
- **GitHub API** pour les statistiques de repository

---

<div align="center">

**Construit avec ❤️ par [Florin Cuzeac](https://cuzeacflorin.fr)**

[🌍 Website](https://cuzeacflorin.fr) • [💼 LinkedIn](https://linkedin.com/in/florin-cuzeac) • [🐙 GitHub](https://github.com/envindavsorg)

</div>
