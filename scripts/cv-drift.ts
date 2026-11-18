/**
 * Reports drift between cv/main.tex (source of truth) and src/data/cv.ts (HTML version).
 * Run: pnpm cv:check   (also part of `pnpm check`). Exits 1 on any difference.
 */
import { readFileSync } from 'node:fs';
import { cv } from '../src/data/cv.ts';

const raw = readFileSync(new URL('../cv/main.tex', import.meta.url), 'utf8');
const body = raw.slice(raw.indexOf('\\begin{document}'));

/** LaTeX → plain text, normalized the same way the HTML strings are written. */
function plain(s: string): string {
  let out = s.replace(/(^|[^\\])%.*$/gm, '$1');
  let prev;
  do {
    prev = out;
    out = out
      .replace(/\\(?:textbf|textit|underline|emph)\{([^{}]*)\}/g, '$1')
      .replace(/\\link\{[^{}]*\}\{([^{}]*)\}/g, '$1');
  } while (out !== prev);
  return out
    .replace(/\\textasciitilde\s*/g, '~')
    .replace(/\\([#&%_])/g, '$1')
    .replace(/\\[,;]/g, ' ')
    .replace(/\\textperiodcentered/g, '·')
    .replace(/\\(?:par|hfill)\b/g, ' ')
    .replace(/\\\\(\[[^\]]*\])?/g, ' ')
    .replace(/--/g, '–')
    .replace(/\s+/g, ' ')
    .trim();
}

const text = plain(body);
const issues: string[] = [];
const has = (needle: string, what: string) => {
  if (!text.includes(needle)) issues.push(`${what} not found in main.tex: "${needle}"`);
};

// Header
has(cv.name, 'name');
has(cv.headline, 'headline');
has(cv.tagline, 'tagline');
has(cv.location, 'location');

// Jobs: same order, same org/location/role/dates.
const texJobs = [...text.matchAll(/\\job\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g)].map((m) =>
  m.slice(1, 5).join(' | '),
);
const htmlJobs = cv.experience.map((j) => [j.org, j.location, j.role, j.dates].join(' | '));
if (texJobs.join('\n') !== htmlJobs.join('\n')) {
  issues.push(
    `experience headers differ:\n  tex:  ${texJobs.join('\n        ')}\n  html: ${htmlJobs.join('\n        ')}`,
  );
}

// Education: same order, same school/location/dates/degree.
const texEdu = [...text.matchAll(/\\edu\{([^}]*)\}\{([^}]*)\}\s*\{([^}]*)\}/g)].map((m) =>
  m.slice(1, 4).join(' | '),
);
const htmlEdu = cv.education.map((e) =>
  [`${e.school}, ${e.location}`, e.dates, e.degree].join(' | '),
);
if (texEdu.join('\n') !== htmlEdu.join('\n')) {
  issues.push(
    `education differs:\n  tex:  ${texEdu.join('\n        ')}\n  html: ${htmlEdu.join('\n        ')}`,
  );
}

// Every \item in the LaTeX must match exactly one HTML string, and vice versa.
const texItems = [...text.matchAll(/\\item\s+(.*?)(?=\\item|\\end\{itemize\})/g)].map((m) =>
  m[1]!.trim(),
);
const htmlItems = [
  ...cv.experience.flatMap((j) => [
    ...j.highlights,
    ...('tech' in j && j.tech ? [`Technologies: ${j.tech.join(', ')}.`] : []),
  ]),
  // Summaries are capitalized for display; the LaTeX continues the sentence in lower case.
  ...cv.projects.map(
    (p) =>
      `${p.name} (${p.stack.join(', ')}) – ${p.summary[0]!.toLowerCase()}${p.summary.slice(1)}`,
  ),
  ...cv.education.flatMap((e) => ('notes' in e && e.notes ? e.notes : [])),
];
for (const item of texItems) {
  if (!htmlItems.includes(item)) issues.push(`main.tex item missing from cv.ts: "${item}"`);
}
for (const item of htmlItems) {
  if (!texItems.includes(item)) issues.push(`cv.ts item missing from main.tex: "${item}"`);
}

// Skills rows, achievements, languages.
for (const s of cv.skills) {
  const extra = [
    s.familiar ? ` · familiar: ${s.familiar.join(', ')}` : '',
    s.tools ? ` · tools: ${s.tools.join(', ')}` : '',
  ].join('');
  has(`${s.group}: & ${s.items.join(', ')}${extra}`, `skills row "${s.group}"`);
}
cv.achievements.forEach((a) => has(a, 'achievement'));
has(`Languages: ${cv.languages.join(', ')}`, 'languages');

if (issues.length) {
  console.error(
    `CV drift: ${issues.length} difference(s) between cv/main.tex and src/data/cv.ts\n`,
  );
  issues.forEach((i) => console.error(`- ${i}`));
  process.exit(1);
}
console.log('CV drift check: cv/main.tex and src/data/cv.ts are in sync.');
