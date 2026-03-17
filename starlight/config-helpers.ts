/**
 * Mylonics Starlight — Shared Configuration Helpers
 *
 * Helpers to build consistent Starlight config across all Mylonics
 * documentation sites (zephyr-ide, struct-frame, bmp-debug).
 *
 * Usage in astro.config.mjs:
 *
 *   import { mylonicsStarlightDefaults } from './path-to/mylonics-styles/starlight/config-helpers';
 *
 *   starlight({
 *     ...mylonicsStarlightDefaults('Zephyr IDE', {
 *       github: 'https://github.com/mylonics/zephyr-ide',
 *     }),
 *     // project-specific overrides...
 *     sidebar: [ ... ],
 *   })
 */

import type { HeadTagOptions } from './head-tags';
import { makeHeadTags } from './head-tags';

export interface StarlightDefaultsOptions {
  /** Product name shown in the Starlight title and meta tags */
  product: string;
  /** GitHub repository URL */
  github?: string;
  /** Path to the Starlight custom.css from this package (relative to the consuming project) */
  stylesPath?: string;
  /** Additional CSS files from the consuming project */
  extraCss?: string[];
  /** Head tag options forwarded to makeHeadTags */
  headOptions?: Partial<HeadTagOptions>;
}

/**
 * Returns a partial Starlight config object with Mylonics defaults.
 * Spread this into your `starlight({})` call.
 */
export function mylonicsStarlightDefaults(
  product: string,
  options: Omit<StarlightDefaultsOptions, 'product'> = {},
) {
  const {
    github,
    stylesPath = './mylonics-styles/starlight/custom.css',
    extraCss = [],
    headOptions = {},
  } = options;

  const social: Array<{ icon: string; label: string; href: string }> = [];
  if (github) {
    social.push({ icon: 'github', label: 'GitHub', href: github });
  }

  return {
    customCss: [stylesPath, ...extraCss],
    social,
    head: makeHeadTags({ product, ...headOptions }),
    credits: false,
    editLink: github
      ? {
          baseUrl: `${github}/edit/main/docs/`,
        }
      : undefined,
  };
}
