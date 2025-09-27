import { loader } from 'fumadocs-core/source';
import { icons } from "lucide-react";
import { createElement } from "react";
import { create, docs } from "../../source.generated";

export const source = loader({
  source: await create.sourceAsync(docs.doc, docs.meta),
  baseUrl: "/docs",
  // icon(icon) {
  //   const iconElement = icons[icon as keyof typeof icons];
  //   console.log(icon, iconElement);
  //   return createElement(iconElement);
  // if (!icon) {
  //   // You may set a default icon
  //   return;
  // }
  // if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  // },
});
