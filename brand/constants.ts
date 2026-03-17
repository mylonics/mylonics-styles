/**
 * Mylonics Brand Constants
 *
 * Shared company metadata, social links, and SEO defaults used across
 * the main site and all documentation sites.
 */

export const MYLONICS = {
  name: 'Mylonics',
  author: 'Rijesh Augustine',
  url: 'https://mylonics.com',
  tagline: 'Electrical Design and Contracting',
  description:
    'Mylonics provides professional electrical and embedded systems design services. Specializing in PCB design, industrial automation, robotics, and firmware development.',
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/mylonics',
  x: 'https://twitter.com/mylonics',
} as const;

/**
 * Product documentation sites.
 * Each entry maps a product key to its docs URL and GitHub repo.
 */
export const PRODUCTS = {
  'zephyr-ide': {
    name: 'Zephyr IDE',
    docsUrl: 'https://zephyr-ide.mylonics.com',
    repo: 'https://github.com/mylonics/zephyr-ide',
  },
  'struct-frame': {
    name: 'Struct Frame',
    docsUrl: 'https://struct-frame.mylonics.com',
    repo: 'https://github.com/mylonics/struct-frame',
  },
  'bmp-debug': {
    name: 'BMP Debug',
    docsUrl: 'https://bmp-debug.mylonics.com',
    repo: 'https://github.com/mylonics/bmp-debug',
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
