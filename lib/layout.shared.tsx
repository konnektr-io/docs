import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { AlbumIcon } from "lucide-react";

export const linkItems: LinkItemType[] = [
  {
    icon: <AlbumIcon />,
    text: "Blog",
    url: "/blog",
    active: "nested-url",
  },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
          <img src="/konnektr.svg" alt="Konnektr Logo" className="h-7 w-7" />
          <span className="hidden sm:inline">Konnektr</span>
        </div>
      ),
      url: "https://konnektr.io",
    },
    githubUrl: "https://github.com/konnektr-io",
  };
}
