import type { ReactNode } from "react";
import { SidebarProvider, Sidebar } from "../../components/ui/sidebar";
import DocsSidebarContent from "./DocsSidebarContent";
import UnifiedHeader from "./UnifiedHeader";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import DocsSidebarHeader from "./DocsSidebarHeader";

interface DocsLayoutProps {
  children: ReactNode;
  tree: any; // PageTree.Root, type imported where used
}

export default function DocsLayout({ children, tree }: DocsLayoutProps) {
  // Set nav height for Fumadocs layout compatibility
  // (should be set in global CSS as well)
  return (
    <TreeContextProvider tree={tree}>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          {/* Unified sticky header at the top */}
          <UnifiedHeader showSidebarTrigger={true} />

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar starts below header */}
            <Sidebar className="top-16">
              <DocsSidebarHeader />
              <DocsSidebarContent tree={tree} />
            </Sidebar>

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto">
              {/* Let DocsPage component handle the TOC layout internally */}
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TreeContextProvider>
  );
}
