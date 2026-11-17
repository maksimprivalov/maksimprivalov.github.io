/**
 * Build an internal URL that respects the configured base path.
 * Always use this (never a hard-coded leading '/') for links and assets.
 *
 *   url()            -> '/site/'
 *   url('cv')        -> '/site/cv'
 *   url('/cv.pdf')   -> '/site/cv.pdf'
 *   url('#projects') -> '/site/#projects'
 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

/** Absolute URL (for OG images, RSS, JSON-LD), built from the configured `site`. */
export function absoluteUrl(path = ''): string {
  return new URL(url(path), import.meta.env.SITE).href;
}
