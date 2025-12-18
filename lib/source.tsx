import {
  type InferMetaType,
  type InferPageType,
  type LoaderPlugin,
  loader,
  multiple,
} from "fumadocs-core/source";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
import { blog as blogPosts, docs } from "fumadocs-mdx:collections/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapi } from "@/lib/openapi";

export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
    openapi: await openapiSource(openapi, {
      baseDir: "openapi/(generated)",
    }),
  }),
  {
    baseUrl: "/docs",
    plugins: [pageTreeCodeTitles(), lucideIconsPlugin(), openapiPlugin()],
  }
);

function pageTreeCodeTitles(): LoaderPlugin {
  return {
    transformPageTree: {
      file(node) {
        if (
          typeof node.name === "string" &&
          (node.name.endsWith("()") || node.name.match(/^<\w+ \/>$/))
        ) {
          return {
            ...node,
            name: <code className="text-[0.8125rem]">{node.name}</code>,
          };
        }
        return node;
      },
    },
  };
}

export const blog = loader(toFumadocsSource(blogPosts, []), {
  baseUrl: "/blog",
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  if (page.data.type === "openapi") return null;
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
}

export type Page = InferPageType<typeof source>;
export type Meta = InferMetaType<typeof source>;
