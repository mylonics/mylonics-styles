/**
 * Mylonics Starlight — Shared Head Tags
 *
 * Common <head> entries for SEO, Open Graph, and Twitter Cards
 * used across all Mylonics documentation sites.
 *
 * Usage in astro.config.mjs:
 *
 *   import { makeHeadTags } from './path-to/mylonics-styles/starlight/head-tags';
 *
 *   starlight({
 *     head: makeHeadTags({
 *       product: 'Zephyr IDE',
 *       twitterSite: '@mylonics',
 *       ogImage: 'https://raw.githubusercontent.com/mylonics/zephyr-ide/main/media/logo.png',
 *     }),
 *   })
 */

export interface HeadTagOptions {
  /** Product name (e.g. "Zephyr IDE") */
  product: string;
  /** Twitter handle for the site (default: @mylonics) */
  twitterSite?: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Additional keywords to append to default list */
  keywords?: string[];
}

interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  content?: string;
}

const BASE_KEYWORDS = [
  'Mylonics',
  'embedded development',
  'firmware development',
  'Zephyr RTOS',
  'IoT',
  'embedded systems',
];

export function makeHeadTags(options: HeadTagOptions): HeadTag[] {
  const {
    product,
    twitterSite = '@mylonics',
    ogImage,
    keywords = [],
  } = options;

  const allKeywords = [...BASE_KEYWORDS, product, ...keywords];

  const tags: HeadTag[] = [
    {
      tag: 'meta',
      attrs: {
        name: 'keywords',
        content: allKeywords.join(', '),
      },
    },
    {
      tag: 'meta',
      attrs: {
        name: 'author',
        content: 'Mylonics',
      },
    },
    {
      tag: 'meta',
      attrs: {
        property: 'og:site_name',
        content: `${product} — Mylonics`,
      },
    },
    {
      tag: 'meta',
      attrs: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tag: 'meta',
      attrs: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tag: 'meta',
      attrs: {
        name: 'twitter:site',
        content: twitterSite,
      },
    },
  ];

  if (ogImage) {
    tags.push(
      {
        tag: 'meta',
        attrs: {
          property: 'og:image',
          content: ogImage,
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'twitter:image',
          content: ogImage,
        },
      },
    );
  }

  return tags;
}
