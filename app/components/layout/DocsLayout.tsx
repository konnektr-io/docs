import type { ReactNode } from "react";
import { SidebarProvider, Sidebar } from "../../components/ui/sidebar";
import DocsSidebarContent from "./DocsSidebarContent";
import UnifiedHeader from "./UnifiedHeader";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";

interface DocsLayoutProps {
  children: ReactNode;
  tree: any; // PageTree.Root, type imported where used
}

export default function DocsLayout({ children, tree }: DocsLayoutProps) {
  return (
    <TreeContextProvider tree={tree}>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen w-full">
          {/* Unified sticky header at the top */}
          <UnifiedHeader showSidebarTrigger={true} />
          <div className="flex flex-1 w-full relative">
            {/* Sidebar below header, full height minus header */}
            <div className="hidden md:block">
              <Sidebar className="fixed top-16 left-0 h-[calc(100vh-64px)] w-[280px] overflow-y-auto border-r">
                <DocsSidebarContent tree={tree} />
              </Sidebar>
            </div>
            {/* Main content area with container for Fumadocs TOC */}
            <main className="flex-1 overflow-y-auto" id="nd-docs-layout">
              <div className="container max-w-[var(--fd-page-width)] mx-auto max-xl:px-0 max-xl:max-w-none">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TreeContextProvider>
  );
}
