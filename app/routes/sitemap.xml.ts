// Resource route for sitemap.xml
// This exports a loader that generates the sitemap on demand
import { source } from "../lib/source";

const SITE_URL = "https://docs.konnektr.io";

export async function loader({ request }: { request: Request }) {
  // Helper to build absolute URLs
  const url = (path: string) => `${SITE_URL}${path}`;

  // Get all docs pages from source
  const pages = source.getPages();

  // Build sitemap entries for all pages
  const pageEntries = pages
    .filter((page: any) => {
      // Exclude non-docs or special pages if needed
      return page.data?.type !== "openapi";
    })
    .map((page: any) => {
      // Use current date for lastmod since we don't have reliable lastModified
      const lastMod = new Date().toISOString().split("T")[0];

      return `  <url>
    <loc>${url(page.url)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
    });

  // Add static entries (homepage, docs root)
  const staticEntries = [
    `  <url>
    <loc>${url("/")}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${url("/docs")}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
  ];

  // Combine all entries
  const allEntries = [...staticEntries, ...pageEntries].join("\n");

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries}
</urlset>`;

  // Return XML response
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}
