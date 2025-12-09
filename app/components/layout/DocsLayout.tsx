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
          <div className="flex flex-1 w-full">
            {/* Sidebar below header, full height minus header */}
            <div style={{ height: "calc(100vh - 64px)" }} className="relative">
              <Sidebar className="h-full overflow-y-auto">
                <DocsSidebarContent tree={tree} />
              </Sidebar>
            </div>
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
