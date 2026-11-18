import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One line: what it is. Used on cards, as the page lead and meta description. */
    summary: z.string(),
    /** Short line shown above the card title. */
    kind: z.string(),
    tech: z.array(z.string()),
    repo: z.url().optional(),
    /** Extra external link (e.g. a deployed bot). */
    live: z.object({ label: z.string(), href: z.url() }).optional(),
    /** How the planned interactive demo will run (shown honestly on the page). */
    demo: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
    team: z.boolean().default(false),
  }),
});

export const collections = { projects };
