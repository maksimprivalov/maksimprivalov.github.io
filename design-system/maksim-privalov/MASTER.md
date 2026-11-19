# Design System: Master File (binding)

> **LOGIC:** When building a specific page, first check `design-system/maksim-privalov/pages/<page>.md`.
> If that file exists, its rules **override** this file. Otherwise follow this file.
> Implementation lives in `src/styles/global.css` (tokens + component classes) and `src/components/ui/`.
> A live specimen of every component is at `/styleguide` (noindex).

**Project:** Maksim Privalov: personal site (portfolio, blog, CV)
**Base:** generated with ui-ux-pro-max (`"dark minimal fintech developer portfolio"`, variance 3 / motion 2 / density 3),
then adapted: generated slate/navy palette replaced with the fixed palette, Inter/Google CDN replaced with
self-hosted Geist + JetBrains Mono, "Enterprise Gateway" page pattern dropped (wrong product type), and
motion/radii tuned against coffer.so.
**Style:** Minimalism & Swiss. Dark, calm, spacious, grid-based, thin borders, one accent.

---

## 1. Color (fixed: do not change)

| Token            | Hex       | Use                                                                         |
| ---------------- | --------- | --------------------------------------------------------------------------- |
| `--bg`           | `#161616` | Page background                                                             |
| `--line`         | `#262626` | Dividers, card/tag borders, subtle surfaces                                 |
| `--muted`        | `#8A8A8A` | Descriptions, dates, navigation, labels                                     |
| `--text`         | `#EDEDED` | Headings and body                                                           |
| `--accent`       | `#10B981` | Status dot, link underlines, hover, primary buttons, focus ring             |
| `--accent-hover` | `#34D399` | Hover state of accent elements                                              |
| `--danger`       | `#F87171` | _Semantic extension._ Failure states only (saga failure in demos/animation) |

Tailwind utilities: `bg-bg`, `border-line`, `text-muted`, `text-text`, `text-accent`, `bg-accent`, `text-danger`, …
Never write raw hex in components; use the tokens.

### Verified contrast (WCAG 2.x)

| Pair                           | Ratio    | Verdict                                                         |
| ------------------------------ | -------- | --------------------------------------------------------------- |
| text on bg                     | 15.46    | AAA                                                             |
| muted on bg                    | 5.24     | AA                                                              |
| accent on bg                   | 7.13     | AAA (links, small accent text OK)                               |
| accent-hover on bg             | 9.41     | AAA                                                             |
| **bg on accent** (button text) | 7.13     | AAA                                                             |
| white on accent                | 2.54     | **FAIL: never use**                                             |
| **muted on line**              | **4.38** | **FAIL for body text.** Never put muted text on a `--line` fill |
| text on line                   | 12.93    | AAA                                                             |
| danger on bg                   | 6.54     | AA                                                              |

Consequences:

- Text on emerald is always `--bg` (`#161616`).
- Tags/chips: transparent fill + `--line` border + `--muted` text (5.24). No gray-filled chips with muted text.
- `--line` borders are decorative (1.20:1); interactive elements must also be identifiable by text/shape, not border alone.

### Glow

At most **one** emerald glow per view: a soft radial gradient of `--accent` at ≤ 12% opacity, behind the hero.
Utility: `.glow` (see global.css). No glows on cards, buttons or text.

---

## 2. Typography

| Role                                  | Font                                         | Notes                                           |
| ------------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| Sans (UI, headings, body)             | **Geist Variable** (Fontsource, self-hosted) | fallback `Geist Fallback` (size-adjusted Arial) |
| Mono (labels, code, numbers, amounts) | **JetBrains Mono Variable**                  | always `tabular-nums` for amounts/tables        |

Scale (mobile → desktop via `clamp`):

| Class           | Size                             | Weight | Tracking | Leading | Use                                |
| --------------- | -------------------------------- | ------ | -------- | ------- | ---------------------------------- |
| `.text-display` | clamp(2.5rem, 7vw, 4.5rem)       | 600    | -0.04em  | 1.02    | `h1` on home hero only             |
| `.text-h1`      | clamp(2rem, 5vw, 3rem)           | 600    | -0.03em  | 1.1     | `h1` on inner pages                |
| `.text-h2`      | clamp(1.75rem, 3.5vw, 2.25rem)   | 600    | -0.025em | 1.15    | Section headings                   |
| `.text-h3`      | 1.125–1.25rem                    | 600    | -0.01em  | 1.3     | Card titles                        |
| `.text-lead`    | clamp(1.0625rem, 1.6vw, 1.25rem) | 400    | 0        | 1.6     | Intro paragraphs (`--text` at 85%) |
| body            | 1rem (16px)                      | 400    | 0        | 1.65    | Never below 16px for body          |
| small           | 0.875rem                         | 400    | 0        | 1.5     | Meta, card descriptions            |
| `.eyebrow`      | 0.75rem mono, uppercase          | 500    | 0.08em   | 1       | Section labels (`01 / Projects`)   |

Rules: one `h1` per page, heading order never skips levels, line length ≤ 70ch for prose (`max-w-prose`),
`text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

---

## 3. Spacing and layout

Density 3/10 (spacious). Base unit 4px; use Tailwind's scale.

| Token                    | Value                                     | Usage                                             |
| ------------------------ | ----------------------------------------- | ------------------------------------------------- |
| gutter                   | 16px (`px-4`) mobile, 24px (`sm:px-6`) up | Page side padding (no horizontal scroll at 320px) |
| container                | `max-w-5xl` (64rem)                       | All content; prose pages `max-w-3xl`              |
| section padding          | `py-20` mobile, `md:py-28`                | Between home sections                             |
| section header → content | `mt-10 md:mt-12`                          |                                                   |
| card padding             | `p-6` (`md:p-7`)                          |                                                   |
| grid gap                 | `gap-4` cards, `gap-6` larger blocks      |                                                   |

Breakpoints (Tailwind defaults, mobile first): 375 · 640 (`sm`) · 768 (`md`) · 1024 (`lg`) · 1440.

---

## 4. Radii, borders, elevation

| Token         | Value  | Use                                 |
| ------------- | ------ | ----------------------------------- |
| `--radius-sm` | 6px    | Code inline, small controls         |
| `--radius-md` | 10px   | Buttons, inputs, nav items          |
| `--radius-lg` | 16px   | Cards, header pill                  |
| `--radius-xl` | 24px   | Large feature surfaces, demo frames |
| pill          | 9999px | Tags, status badge                  |

Elevation is expressed with **borders, not shadows**. 1px `--line` borders everywhere; the only shadow is the
header pill's soft dark shadow so it separates from content while scrolling.

---

## 5. Motion

| Token        | Value                                                                       |
| ------------ | --------------------------------------------------------------------------- |
| `--ease-out` | `cubic-bezier(.22, 1, .36, 1)` (ease-out-quint, same family coffer.so uses) |
| `--dur-fast` | 150ms (color/border hover)                                                  |
| `--dur`      | 250ms (UI state: menu, icon nudge)                                          |
| `--dur-slow` | 500ms (scroll reveal)                                                       |

- Hover: color/border transitions only, plus a 2px arrow nudge on cards. No scale, no bounce, no translateY on cards.
- Scroll reveal: `data-reveal` → fade + 12px rise, once, `--dur-slow`. Content is **visible without JS**
  (hidden state only applies under `html.js`), and fully visible under `prefers-reduced-motion`.
- Exits faster than entrances. Never animate width/height/top/left.
- No animation library: CSS transitions + a tiny IntersectionObserver script.

---

## 6. Components (implemented in `src/components/ui/`)

### Button (`Button.astro`, classes `.btn .btn-primary|.btn-secondary|.btn-ghost`)

- Height 44px (touch target), `px-5`, `--radius-md`, `text-sm font-medium`, optional trailing icon.
- **Primary:** `bg-accent text-bg`, hover `bg-accent-hover`. Max one primary per view.
- **Secondary:** transparent, `border-line text-text`, hover `border-accent/50 text-accent`.
- **Ghost:** `text-muted`, hover `text-text`.
- Rendered as `<a>` when it has `href`; external links get `target=_blank rel="noopener noreferrer"` and an
  `arrow-up-right` icon.

### Card (`Card.astro`, class `.card`)

- `<a>` wrapping the whole card when it links somewhere; `--radius-lg`, `border-line`, `p-6`.
- Hover/focus-visible: border → `accent/40`, background → `white/[0.02]`, arrow nudges 2px. Title turns `text-accent`.
- Content order: eyebrow/meta (mono, muted) → title (`.text-h3`) → description (small, muted) → tags.

### Tag (`Tag.astro`, class `.tag`)

- Pill, `border-line`, transparent fill, mono 12px, `text-muted`. As link: hover `text-accent border-accent/40`.

### Status badge (`StatusBadge.astro`)

- Emerald dot (with a slow 2.4s ping ring, disabled under reduced motion) + `SITE.status` text, muted.

### Section heading (`SectionHeading.astro`)

- Eyebrow `NN / Label` (mono, accent number + muted label) → `h2.text-h2` → optional lead.

### Header (`Header.astro`)

- Sticky, floating pill (coffer-style): `max-w-5xl`, `--radius-lg`, `bg/80` + backdrop blur, `border-line`, height 56px.
- Left: round photo avatar (`src/assets/avatar.jpg`, cropped from `cv/photo.jpg`) + name. Center/right: nav `About · Projects · Experience · Writing · CV · Contact` (muted → text on
  hover; `aria-current` gets text + accent underline). Right: status badge (lg+).
- Below `md`: menu button (44×44, `aria-expanded`, `aria-controls`) opens a panel inside the pill;
  Escape and link click close it.

### Footer (`Footer.astro`)

- `border-t line`, two rows: name + short line / icon links (GitHub, LinkedIn, Email); © year, "Built with Astro".

### Links in text (`.link`)

- `--text` with `--accent` underline (offset 4px, 1px → 2px on hover), hover text `--accent`.

### Icons (`Icon.astro`)

- Inline SVG only. Lucide-style 24px grid, 1.75 stroke (ISC) for UI icons; Simple Icons paths (CC0) for brand marks.
- Decorative icons `aria-hidden="true"`; icon-only links/buttons require `aria-label`.

---

## 7. Accessibility (non-negotiable)

- Visible focus ring: 2px `--accent`, 3px offset, on every interactive element (`:focus-visible`).
- Skip link "Skip to content" as the first focusable element.
- Touch targets ≥ 44×44px; ≥ 8px between adjacent targets.
- `prefers-reduced-motion`: disable reveal, ping, particle animation; show final state.
  Exception: the hero coin keeps a slow turn (0.25 rad/s, almost no bit flicker, no hover speed-up),
  because many Windows machines report reduced motion by default and the hero looked broken there.
- Separators: no middle dots (`·`) in visible copy; use commas, a line break or a `--line` divider.
- Landmarks: `header`, `nav[aria-label]`, `main#main`, `footer`. Canvas visuals `aria-hidden` + text alternative.

---

## 8. Anti-patterns (do NOT)

- Light mode, or any second accent color.
- Emoji as icons; mixed icon sets.
- White text on emerald; muted text on `--line` fills.
- More than one glow per view; drop shadows on cards.
- Scale/bounce hovers, layout-shifting hovers, instant (0ms) state changes.
- Content hidden by default that requires JS to appear.
- Raw hex values in components.

---

## 9. Pre-delivery checklist (run at the end of every phase)

- [ ] Contrast: every text/background pair is in the verified table above (or newly checked ≥ 4.5:1)
- [ ] Spacing: section rhythm and gutters match §3; nothing touches the viewport edge on 320–375px
- [ ] Hierarchy: one `h1`, ordered headings, one primary button per view
- [ ] Focus: tab through the page, every stop has a visible accent ring, order is logical
- [ ] Mobile: 375px and 768px, no horizontal scroll, menu works with keyboard and touch
- [ ] Motion: works and looks complete with `prefers-reduced-motion: reduce` and with JS disabled
- [ ] `cursor: pointer` on all clickable elements; hover transitions 150–300ms
- [ ] No hard-coded leading `/` in links (use `url()`)
