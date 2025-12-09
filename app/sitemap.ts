// Auto-generated sitemap for Konnektr Docs
// SSR/static export compatible
import { source } from "./lib/source";

const SITE_URL = "https://docs.konnektr.com";

export async function getSitemap() {
  // Helper to build absolute URLs
  const url = (path: string) => `${SITE_URL}${path}`;

  // Get all docs pages from source
  const pages = await source.getPages();

  // Map each page to sitemap entry
  const items = await Promise.all(
    pages.map(async (page: any) => {
      // Exclude non-docs or special pages if needed
      if (page.data.type === "openapi") return undefined;
      const { lastModified } = await page.data.load();
      return {
        url: url(page.url),
        lastModified: lastModified ? new Date(lastModified) : undefined,
        changeFrequency: "weekly",
        priority: 0.5,
      };
    })
  );

  // Add static entries (homepage, docs root, etc.)
  const staticEntries = [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: url("/docs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Return combined sitemap
  return [...staticEntries, ...items.filter(Boolean)];
}

// For static export, export default async function
export default async function sitemap() {
  return await getSitemap();
}

/**
 * Usage:
 * - SSR: import and call getSitemap()
 * - Static export: default export is compatible
 */
