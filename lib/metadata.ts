// Centralized metadata utilities for Konnektr Docs
// Aligns with homepage SEO and Fumadocs best practices

// Local Metadata type (aligns with SEOData from homepage)
export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  structuredData?: Record<string, any>;
}

const SITE_CONFIG = {
  name: "Konnektr",
  title: "Konnektr Docs - Technical Documentation Portal",
  description:
    "Explore technical documentation, guides, and API references for the Konnektr Platform. Organized by product, always up-to-date.",
  url: "https://docs.konnektr.com",
  // Use absolute URL for homepage Open Graph image
  ogImage: "https://konnektr.io/og-images/homepage-og.png",
  twitterHandle: "@konnektr",
};

export function createMetadata(override: Partial<Metadata>): Metadata {
  return {
    title: override.title || SITE_CONFIG.title,
    description: override.description || SITE_CONFIG.description,
    keywords: override.keywords || [
      "konnektr docs",
      "digital twin documentation",
      "graph database docs",
      "API reference",
      "assembler",
      "flow",
      "compass",
      "open source docs",
    ],
    canonicalUrl: override.canonicalUrl || SITE_CONFIG.url,
    ogType: override.ogType || "website",
    ogImage: override.ogImage || SITE_CONFIG.ogImage,
    twitterCard: override.twitterCard || "summary_large_image",
    structuredData: override.structuredData || {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      publisher: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: "https://konnektr.io",
      },
    },
    ...override,
  };
}

// Helper to generate meta tags HTML
export function generateMetaTags(seoData: Metadata): string {
  const canonicalUrl = seoData.canonicalUrl || SITE_CONFIG.url;
  // Always use homepage ogImage as fallback
  const ogImage = seoData.ogImage || SITE_CONFIG.ogImage;

  return `
    <title>${seoData.title}</title>
    <meta name="description" content="${seoData.description}" />
    <meta name="keywords" content="${seoData.keywords?.join(", ")}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <!-- Open Graph -->
    <meta property="og:type" content="${seoData.ogType || "website"}" />
    <meta property="og:title" content="${seoData.title}" />
    <meta property="og:description" content="${seoData.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="${SITE_CONFIG.name}" />
    <!-- Twitter Card -->
    <meta name="twitter:card" content="${
      seoData.twitterCard || "summary_large_image"
    }" />
    <meta name="twitter:site" content="${SITE_CONFIG.twitterHandle}" />
    <meta name="twitter:title" content="${seoData.title}" />
    <meta name="twitter:description" content="${seoData.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Konnektr" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  `.trim();
}

// Helper to generate JSON-LD structured data
export function generateStructuredData(data: Record<string, any>): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Usage:
 * - Use createMetadata() to generate page metadata, merging overrides with site defaults.
 * - Use generateMetaTags() to render meta tags in SSR/static export.
 * - Use generateStructuredData() for JSON-LD script blocks.
 */

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://docs.konnektr.io";
