# Internationalization (i18n) Guide

This project uses **Lingui** for internationalization with support for English (`en`) and French (`fr`).

## Setup Overview

- **Framework**: Lingui v5
- **Locales**: English (en), French (fr)
- **Source Locale**: English
- **Catalog Location**: `locales/`

## Adding Translations

### Step-by-Step Guide

#### 1. Wrap text with i18n

In your component, get the i18n instance and wrap your text:

```tsx
// At the top of your component function
const { lang } = await params;
const i18n = getI18nInstance(lang);

// Then wrap your text
{i18n._({
    id: 'your.unique.id',
    message: 'Your English text here',
})}
```

**Example:**
```tsx
<h1>
    {i18n._({
        id: 'homepage.welcome.title',
        message: 'Welcome to my portfolio',
    })}
</h1>
```

#### 2. Extract the messages

Run the extraction command:
```bash
pnpm lingui:extract
```

This will automatically update `locales/en.po` and `locales/fr.po` with your new message.

#### 3. Add the French translation

Open `locales/fr.po` and find your message ID. Add the French translation:

```po
#. js-lingui-explicit-id
#: src/app/[lang]/(app)/(root)/page.tsx:XX
msgid "homepage.welcome.title"
msgstr "Bienvenue sur mon portfolio"
```

#### 4. Test

- Visit `/en` → See "Welcome to my portfolio"
- Visit `/fr` → See "Bienvenue sur mon portfolio"

---

## Getting the Current Language

### In Server Components (pages, layouts)

```tsx
type PageProps = {
    params: Promise<{ lang: string }>;
};

const Page = async ({ params }: PageProps) => {
    const { lang } = await params;

    // Use lang for conditionals
    if (lang === 'fr') {
        // Do something for French
    } else if (lang === 'en') {
        // Do something for English
    }

    return <div>Current language: {lang}</div>;
};
```

### In Client Components

```tsx
'use client';

import { useParams } from 'next/navigation';

export function MyClientComponent() {
    const params = useParams();
    const lang = params.lang as string;

    if (lang === 'fr') {
        return <div>Contenu français</div>;
    }

    return <div>English content</div>;
}
```

### Using the i18n instance

```tsx
const i18n = getI18nInstance(lang);
const currentLocale = i18n.locale; // 'en' or 'fr'

if (currentLocale === 'fr') {
    // French-specific logic
}
```

### Conditional rendering example

```tsx
const Page = async ({ params }: PageProps) => {
    const { lang } = await params;

    return (
        <div>
            {lang === 'fr' ? (
                <img src="/flag-fr.svg" alt="Français" />
            ) : (
                <img src="/flag-en.svg" alt="English" />
            )}
        </div>
    );
};
```

### For links/navigation

```tsx
import Link from 'next/link';

const Navigation = async ({ params }: { params: Promise<{ lang: string }> }) => {
    const { lang } = await params;

    return (
        <nav>
            <Link href={`/${lang}/about`}>
                {lang === 'fr' ? 'À propos' : 'About'}
            </Link>
        </nav>
    );
};
```

---

## Quick Example

**Before:**
```tsx
<PanelTitle>My Projects</PanelTitle>
```

**After:**
```tsx
<PanelTitle>
    {i18n._({
        id: 'homepage.projects.title',
        message: 'My Projects',
    })}
</PanelTitle>
```

Then run `pnpm lingui:extract` and add French in `locales/fr.po`:
```po
msgid "homepage.projects.title"
msgstr "Mes Projets"
```

---

## Routing

### URL Structure

- Root (`/`) → Redirects to `/fr` (configured in `next.config.ts`)
- English: `/en/*`
- French: `/fr/*`

### Middleware

The middleware (`middleware.ts`) handles:
- Language detection from browser preferences
- Redirecting paths without locale to the appropriate language
- Setting the `x-locale` header for the root layout

### Adding New Locales

1. Update `lingui.config.ts`:
```ts
locales: ['en', 'fr', 'de'], // Add 'de' for German
```

2. Run extraction:
```bash
pnpm lingui:extract
```

3. Translate messages in the new `locales/de.po` file

4. Update the root redirect in `next.config.ts` if needed

---

## Commands

- **Extract messages**: `pnpm lingui:extract`
- **Clean extraction**: `pnpm lingui:extract --clean`

---

## File Structure

```
locales/
  ├── en.po          # English translations
  └── fr.po          # French translations

src/
  ├── app/
  │   ├── layout.tsx              # Root layout
  │   ├── [lang]/
  │   │   ├── layout.tsx          # Language-specific layout
  │   │   └── LinguiClientProvider.tsx
  │   ├── appRouterI18n.ts        # i18n setup
  │   └── initLingui.ts           # i18n initialization

middleware.ts                      # Language detection and routing
lingui.config.ts                   # Lingui configuration
next.config.ts                     # Next.js config with redirects
```

---

## Tips

- **Message IDs**: Use descriptive dot-notation IDs (e.g., `homepage.welcome.title`)
- **Source Language**: Keep English as the `message` value - it's the source locale
- **Extraction**: Run `pnpm lingui:extract` after every text change
- **Testing**: Always test both `/en` and `/fr` routes after adding translations
