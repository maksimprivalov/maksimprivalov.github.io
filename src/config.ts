/**
 * Single source of truth for where the site is deployed.
 *
 * GitHub Pages project site: site = 'https://maksimprivalov.github.io', base = '/site'.
 * After a custom domain is set: site = 'https://<domain>', base = '/' (and add public/CNAME).
 */
export const SITE_URL = 'https://maksimprivalov.github.io';
export const BASE_PATH = '/site';

export const SITE = {
  name: 'Maksim Privalov',
  title: 'Maksim Privalov: Backend Engineer, FinTech',
  description:
    'Backend engineer focused on FinTech: payment processing, ledgers and distributed systems in Java/Kotlin, Spring Boot, Rust and Go.',
  lang: 'en',
  status: 'Open to backend & FinTech roles',
  email: 'mprivalovs@gmail.com',
  github: 'https://github.com/maksimprivalov',
  linkedin: 'https://www.linkedin.com/in/maksim-privalov-1479a1263',
  /** Search console verification tokens; leave empty until available. */
  verification: {
    google: '',
    bing: '',
  },
} as const;
