import type { ReactNode } from "react";
import { DocsLayout as BaseDocsLayout } from "fumadocs-ui/layouts/docs";
// import type * as PageTree from "fumadocs-core/page-tree";
import Header from "./Header";

interface DocsLayoutProps {
  children: ReactNode;
  tree: any; // PageTree.Root;
}

export default function DocsLayout({ children, tree }: DocsLayoutProps) {
  return (
    <BaseDocsLayout
      tree={tree}
      nav={{
        component: <Header />,
      }}
      sidebar={{
        enabled: true,
        collapsible: true,
        // Disable theme toggle, we have one in the header
        footer: <></>,
        
      }}
    >
      {children}
    </BaseDocsLayout>
  );
}
