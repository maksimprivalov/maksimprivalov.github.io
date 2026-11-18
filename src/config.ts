/**
 * Single source of truth for where the site is deployed.
 *
 * GitHub Pages user site (repo maksimprivalov.github.io), served from the root.
 * For a custom domain: set SITE_URL = 'https://<domain>' and add public/CNAME.
 * BASE_PATH stays configurable; all links go through url() so a sub-path still works.
 */
export const SITE_URL = 'https://maksimprivalov.github.io';
export const BASE_PATH = '/';

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
  /** Header navigation; paths are passed through url(). */
  nav: [
    { label: 'Projects', path: '#projects' },
    { label: 'Experience', path: '#experience' },
    { label: 'Writing', path: '#writing' },
    { label: 'CV', path: 'cv' },
    { label: 'Contact', path: '#contact' },
  ],
  /** Search console verification tokens; leave empty until available. */
  verification: {
    google: '',
    bing: '',
  },
} as const;
