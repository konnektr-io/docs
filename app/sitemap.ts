import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/metadata";
import { source } from "@/lib/source";

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, baseUrl).toString();
  const items = await Promise.all(
    source.getPages().map(async (page) => {
      if (page.data._openapi) return;

      return {
        url: url(page.url),
        lastModified: new Date().toISOString().split("T")[0],
        changeFrequency: "weekly",
        priority: 0.5,
      } as MetadataRoute.Sitemap[number];
    })
  );

  return [
    {
      url: url("/docs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...items.filter((v) => v !== undefined),
  ];
}
