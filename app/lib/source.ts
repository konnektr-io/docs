import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import { create, docs } from "../../source.generated";

export const source = loader({
  source: await create.sourceAsync(docs.doc, docs.meta),
  baseUrl: "/docs",
  icon(icon) {
    if (icon && icon in icons) {
      return createElement(icons[icon as keyof typeof icons] as any);
    }
  },
});
