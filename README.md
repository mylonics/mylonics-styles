# mylonics-styles

Shared brand assets, Starlight documentation theme, and Tailwind tokens used across all Mylonics web properties.

## Repository Structure

```
mylonics-styles/
├── action.yml                      # Composite GitHub Action to clone this repo
├── brand/
│   ├── colors.css                  # Brand color CSS custom properties
│   ├── fonts.css                   # Brand font imports + CSS variables
│   └── constants.ts                # Company metadata, social links, product registry
├── starlight/
│   ├── custom.css                  # Shared Starlight custom CSS (fonts, colors, headings)
│   ├── config-helpers.ts           # Starlight config helpers (mylonicsStarlightDefaults)
│   ├── head-tags.ts                # SEO / Open Graph head tag builder
│   ├── starter-astro-config.mjs    # Template astro.config.mjs for new docs projects
│   └── starter-deploy-docs.yml     # Template GitHub Actions workflow for docs deployment
└── tailwind/
    └── brand-theme.css             # Mylonics brand colors as Tailwind @theme tokens
```

## Consuming Repos

| Repo | Theme | What it uses |
|------|-------|-------------|
| **mylonics.github.io** | Screwworks (Tailwind/Astro) | `brand/*`, `tailwind/brand-theme.css` |
| **zephyr-ide** `/docs` | Starlight | `starlight/*`, `brand/*` |
| **struct-frame** `/docs` | Starlight | `starlight/*`, `brand/*` |
| **bmp-debug** `/docs` | Starlight | `starlight/*`, `brand/*` |

## How It Works

This repo is **cloned at build time** via a composite GitHub Action. No npm package publishing is needed.

### GitHub Actions (CI)

Add this step to your workflow **before** `npm install`:

```yaml
- name: Setup Mylonics Styles
  uses: mylonics/mylonics-styles@main
  with:
    path: docs/mylonics-styles   # adjust path to match your project layout
```

The action clones this repo into the specified path so files can be imported at build time.

### Local Development

Clone manually into the expected path:

```bash
# For a docs site at repo-root/docs/
git clone https://github.com/mylonics/mylonics-styles.git docs/mylonics-styles

# For the main site (repo root)
git clone https://github.com/mylonics/mylonics-styles.git mylonics-styles
```

The cloned folder is `.gitignore`d in each consuming repo.

---

## Usage — Starlight Documentation Sites

### 1. Set up `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { mylonicsStarlightDefaults } from './mylonics-styles/starlight/config-helpers';

export default defineConfig({
  site: 'https://your-product.mylonics.com',
  integrations: [
    starlight({
      title: 'Your Product',
      description: 'Product description',
      logo: { src: './src/assets/logo.png' },
      favicon: '/favicon.ico',
      ...mylonicsStarlightDefaults('Your Product', {
        github: 'https://github.com/mylonics/your-product',
        extraCss: ['./src/styles/custom.css'],
        headOptions: {
          ogImage: 'https://raw.githubusercontent.com/mylonics/your-product/main/media/logo.png',
          keywords: ['your', 'product', 'keywords'],
        },
      }),
      sidebar: [ /* ... */ ],
    }),
  ],
});
```

`mylonicsStarlightDefaults()` provides:
- **`customCss`** — shared Starlight CSS (Roboto fonts, brand colors, heading styles) + any extra CSS you pass
- **`social`** — GitHub link
- **`head`** — SEO meta tags (keywords, Open Graph, Twitter Cards)
- **`editLink`** — "Edit this page" link pointing to the GitHub repo

### 2. Add project-specific CSS

Create `src/styles/custom.css` in your docs project for any overrides:

```css
/* Project-specific Starlight overrides go here.
   Base styles (fonts, colors, brand) come from mylonics-styles/starlight/custom.css. */
```

### 3. Add to `.gitignore`

```gitignore
# Shared styles (cloned during CI from mylonics/mylonics-styles)
mylonics-styles/
```

### 4. Copy the deploy workflow

Copy `starlight/starter-deploy-docs.yml` to `.github/workflows/deploy-docs.yml` in your repo and adjust as needed.

---

## Usage — Main Site (Tailwind)

### Import brand colors

In `src/assets/styles/global.css`:

```css
@import '../../mylonics-styles/tailwind/brand-theme.css';
```

This provides the Mylonics blue palette as Tailwind color utilities (`bg-blue-500`, `text-blue-700`, etc.).

### Import brand constants

```ts
import { MYLONICS, SOCIAL_LINKS, PRODUCTS } from '../mylonics-styles/brand/constants';
```

---

## Usage — Vanilla CSS (any project)

For projects not using Starlight or Tailwind:

```css
@import 'path-to/mylonics-styles/brand/colors.css';
@import 'path-to/mylonics-styles/brand/fonts.css';

body {
  font-family: var(--ml-font-body);
  color: var(--ml-gray-900);
}

h1, h2, h3 {
  font-family: var(--ml-font-heading);
}

a {
  color: var(--ml-blue-500);
}
```

---

## Making Changes

1. Edit files in this repo
2. Push to `main`
3. All consuming repos will pick up changes on their next build/deploy

For breaking changes (renamed files, changed API), update all consuming repos in the same PR cycle.
