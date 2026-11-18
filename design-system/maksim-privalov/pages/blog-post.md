# Page override: Blog post (`/blog/[slug]`)

- **Layout:** `max-w-[68ch]` reading column, body 1.0625rem / 1.75 leading for long-form reading.
- **Header:** breadcrumb → `h1.text-h1` → meta row (date · reading time, mono muted) → tags.
- **Prose:** headings `h2` 1.5rem / `h3` 1.25rem, 600; paragraphs `text-text/90`; links use `.link`;
  inline code mono on `--line` fill with **`--text`** color (12.93:1), never muted.
- **Code blocks:** `--radius-lg`, `border-line`, Shiki theme mapped to the palette, copy button top-right
  (44×44 touch area, `aria-label="Copy code"`, live region announces "Copied").
- **TOC:** for posts with ≥ 4 `h2`s; sticky in the right gutter at `xl`, collapsible `<details>` above content below `xl`.
- **Footer of post:** previous/next as two cards.
