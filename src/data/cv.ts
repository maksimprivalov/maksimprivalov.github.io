/**
 * CV content for the HTML pages (/cv and the home page).
 *
 * Mirrors cv/main.tex, which is the source of truth and is compiled to /cv.pdf in CI.
 * `pnpm cv:check` (part of `pnpm check`) reports drift between the two.
 * Deliberately omitted from the HTML version: phone number, photo.
 *
 * Keep this file free of imports: the drift check runs it directly with Node.
 */

export interface Job {
  org: string;
  location: string;
  role: string;
  /** Display dates exactly as in main.tex (e.g. "Mar 2026 – Present"). */
  dates: string;
  highlights: string[];
  tech?: string[];
}

export interface CvProject {
  name: string;
  stack: string[];
  summary: string;
  repo?: string;
  /** Slug of the project page on this site, if it has one. */
  slug?: string;
}

export interface Education {
  school: string;
  location: string;
  dates: string;
  degree: string;
  notes?: string[];
}

export const cv = {
  name: 'Maksim Privalov',
  headline: 'Java Software Engineer',
  tagline: 'Backend engineer with production experience in financial systems.',
  location: 'Novi Sad, Serbia',

  experience: [
    {
      org: 'Faculty of Technical Sciences, University of Novi Sad',
      location: 'Novi Sad, Serbia',
      role: 'Software Engineer',
      dates: 'Mar 2026 – Present',
      highlights: [
        'Integrated embedded Apache Superset dashboards into a Java desktop business system end to end; built a Spring Boot token service issuing short-lived guest tokens with row-level security derived from existing role-based permissions, enabling seamless sign-on without BI accounts or client-side credentials.',
        'Designed and implemented a multi-tenant architecture with per-request configuration resolution for a platform serving 50,000+ users, consolidating service instances into one and cutting server RAM usage by ~86%.',
        'Extended a Windows-only digital document signing system to support macOS and Linux by re-architecting the solution around Java PKCS#11 libraries, eliminating client-side middleware and simplifying deployment.',
      ],
      tech: [
        'Java',
        'Spring Boot',
        'Kafka',
        'Redis',
        'Prometheus',
        'Grafana',
        'Apache Superset',
        'Microsoft SQL Server',
        'Scrum',
      ],
    },
    {
      org: 'Digital Access Logic',
      location: 'Belgrade, Serbia',
      role: 'Software Engineer',
      dates: 'Oct 2024 – Apr 2025',
      highlights: [
        'Integrated payment processing through a bank API broker and implemented automated fiscal receipt generation to meet regulatory compliance requirements.',
        'Built a microservice-based ticketing system serving multiple clients in the entertainment industry, from design through production deployment.',
      ],
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'OpenAPI', 'Postman', 'React', 'Scrum'],
    },
    {
      org: 'KONTEH',
      location: 'Novi Sad, Serbia',
      role: 'KONTEH 2026 Algorithmic Contest Organizer',
      dates: 'Dec 2025 – Mar 2026',
      highlights: [
        'Organized and ran a university-level algorithmic contest, sponsored by Nordeus; created problems, prepared test cases, set up the contest platform and defined the contest structure and rules.',
      ],
    },
  ] satisfies Job[],

  projects: [
    {
      name: 'Payment Processing Service',
      stack: ['Rust', 'Axum', 'PostgreSQL', 'Docker'],
      summary:
        '6 microservices with saga orchestration, idempotent payments, double-entry ledger and audit log.',
      repo: 'https://github.com/maksimprivalov/payment-processing-service',
      slug: 'payment-processing-service',
    },
    {
      name: 'Fraud Detection System',
      stack: ['Java', 'Spring Boot', 'Drools'],
      summary:
        'Real-time rule-based transaction scoring with complex event processing, hierarchical rules and explainable decisions.',
      repo: 'https://github.com/maksimprivalov/credit-card-fraud-detection',
      slug: 'fraud-detection',
    },
    {
      name: 'Cloud Music App',
      stack: ['AWS Lambda', 'DynamoDB', 'S3', 'Cognito', 'Python', 'Angular'],
      summary:
        'Team-built serverless music streaming app with single-table DynamoDB design and stream-driven subscriber notifications.',
      repo: 'https://github.com/maksimprivalov/awscloudmusicapp',
      slug: 'cloud-music-app',
    },
    {
      name: 'CopyBot',
      stack: ['Java', 'Spring', 'Python/Flask', 'PostgreSQL', 'Docker', 'Selenium'],
      summary:
        'Commercialized Telegram bot for cross-posting between social networks, launched in 2024.',
    },
  ] satisfies CvProject[],

  skills: [
    {
      group: 'Languages',
      items: ['Java', 'Kotlin', 'Rust', 'Python', 'SQL'],
      familiar: ['Go', 'C++', 'C#', 'TypeScript'],
    },
    {
      group: 'Backend',
      items: [
        'Spring Boot',
        'Spring Security',
        'Hibernate/JPA',
        'Flyway',
        'Axum',
        'Drools',
        'REST',
      ],
    },
    {
      group: 'Databases',
      items: ['PostgreSQL', 'Microsoft SQL Server', 'Oracle', 'Redis', 'MongoDB', 'DynamoDB'],
    },
    { group: 'Messaging', items: ['Apache Kafka', 'RabbitMQ'] },
    {
      group: 'Security',
      items: ['OAuth 2.0', 'OpenID Connect', 'Keycloak', 'PKCS#11', 'digital signatures'],
    },
    {
      group: 'DevOps & Cloud',
      items: [
        'Docker',
        'Kubernetes',
        'AWS',
        'Prometheus',
        'Grafana',
        'GitLab CI',
        'Apache Superset',
        'Git',
        'Linux',
      ],
    },
    { group: 'Testing', items: ['JUnit', 'Mockito', 'Postman'] },
    {
      group: 'Practices',
      items: [
        'Microservices',
        'serverless',
        'saga pattern',
        'idempotency',
        'double-entry ledger',
        'SOLID',
      ],
    },
    {
      group: 'Methodologies',
      items: ['Agile', 'Scrum', 'Kanban'],
      tools: ['Trello', 'OpenProject', 'Miro'],
    },
  ] as { group: string; items: string[]; familiar?: string[]; tools?: string[] }[],

  education: [
    {
      school: 'Faculty of Technical Sciences, University of Novi Sad',
      location: 'Novi Sad, Serbia',
      dates: 'Oct 2026 – Present',
      degree: 'Master of Software Engineering and Information Technologies, E-Business',
    },
    {
      school: 'Faculty of Technical Sciences, University of Novi Sad',
      location: 'Novi Sad, Serbia',
      dates: 'Oct 2023 – Sept 2026',
      degree: 'Bachelor of Software Engineering and Information Technologies · GPA: 9 / 10',
      notes: ['Thesis: Application of OAuth and OpenID in microservice architecture'],
    },
    {
      school: 'ITMO University',
      location: 'Saint Petersburg, Russia',
      dates: 'Sept 2021 – June 2023',
      degree: 'Bachelor of Neurotechnologies and Software Engineering · GPA: B+ / A',
    },
  ] satisfies Education[],

  achievements: [
    'Course: MIT 15.S08 FinTech: Shaping the Financial World (graduate level, MIT OCW)',
    'Phystech International 2020 medalist',
  ],

  languages: ['Serbian (fluent)', 'Russian (native)', 'English (C1)'],
};
