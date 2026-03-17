/**
 * Starlight Docs Starter — astro.config.mjs template
 *
 * Copy this file into a new docs project and replace the placeholders.
 * See the README for full setup instructions.
 */
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { mylonicsStarlightDefaults } from './mylonics-styles/starlight/config-helpers';

export default defineConfig({
  // TODO: Replace with your docs site URL
  site: 'https://PRODUCT.mylonics.com',
  integrations: [
    starlight({
      // TODO: Replace with your product name
      title: 'PRODUCT NAME',
      description: 'TODO: product description',
      logo: {
        src: './src/assets/logo.png',
      },
      favicon: '/favicon.ico',
      ...mylonicsStarlightDefaults('PRODUCT NAME', {
        // TODO: Replace with your GitHub repo URL
        github: 'https://github.com/mylonics/PRODUCT',
        // Add project-specific CSS files here
        extraCss: ['./src/styles/custom.css'],
        headOptions: {
          ogImage: 'https://raw.githubusercontent.com/mylonics/PRODUCT/main/media/logo.png',
          keywords: ['TODO', 'add', 'product', 'keywords'],
        },
      }),
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
          ],
        },
      ],
    }),
  ],
});
