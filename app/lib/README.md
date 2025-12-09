# Konnektr Docs Metadata Utilities

## metadata.ts

- Use `createMetadata()` to generate page metadata, merging overrides with site defaults.
- Use `generateMetaTags()` to render meta tags in SSR/static export or SSR head.
- Use `generateStructuredData()` for JSON-LD script blocks for structured data.
- All metadata aligns with homepage SEO and Fumadocs best practices.

## sitemap.ts

- Use `getSitemap()` to generate a sitemap array for SSR/static export.
- Default export is compatible with static export frameworks.
- Sitemap includes all docs pages and static entries (homepage, docs root).

## Example Usage

```ts
import {
  createMetadata,
  generateMetaTags,
  generateStructuredData,
} from "./metadata";

const meta = createMetadata({ title: "Graph Docs" });
const metaTags = generateMetaTags(meta);
const jsonLd = generateStructuredData(meta.structuredData);
```

```ts
import getSitemap from "../sitemap";
const sitemap = await getSitemap();
```
