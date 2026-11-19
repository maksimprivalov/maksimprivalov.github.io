/**
 * Smaller projects listed under "More projects" on the home page.
 * Sources: cv/main.tex (CopyBot, thesis) and GitHub repo descriptions.
 * Projects with their own page live in src/content/projects/ instead.
 */
export interface MoreProject {
  name: string;
  stack: string;
  summary: string;
  href?: string;
}

export const moreProjects: MoreProject[] = [
  {
    name: 'CopyBot',
    stack: 'Java, Spring, Python/Flask, PostgreSQL',
    summary:
      'Commercialized Telegram bot for cross-posting between social networks, launched in 2024.',
  },
  {
    name: 'OAuth 2.0 / OpenID Connect in microservices',
    stack: 'Java',
    summary: 'Bachelor thesis: application of OAuth and OpenID in microservice architecture.',
    href: 'https://github.com/maksimprivalov/diploma-oauth2-oidc',
  },
  {
    name: 'Ollama code completion for IntelliJ',
    stack: 'Java, IntelliJ Platform',
    summary:
      'Inline code completion plugin using Starcoder2 via Ollama, with Trie-based caching for fast local suggestions.',
    href: 'https://github.com/maksimprivalov/ollamacompletion',
  },
];
