import { ModeToggle } from "../ui/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { useBreadcrumb } from "fumadocs-core/breadcrumb";
import { useLocation, Link } from "react-router";
import { Home, Search } from "lucide-react";
import type { PageTree } from "fumadocs-core/server";
import { LargeSearchToggle } from "fumadocs-ui/components/layout/search-toggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface DocsHeaderProps {
  showSidebarTrigger?: boolean;
  tree: PageTree.Root;
}

export default function DocsHeader({
  showSidebarTrigger = false,
  tree,
}: DocsHeaderProps) {
  const location = useLocation();
  const items = useBreadcrumb(location.pathname, tree, {
    includeRoot: { url: "/" },
    includePage: true,
  });

  return (
    <header className="flex items-center h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex-1 flex items-center gap-4">
        {/* Mobile Navigation Trigger */}
        {showSidebarTrigger && <SidebarTrigger />}

        {/* Reference implementation: plain breadcrumb rendering */}
        {items.length > 0 && (
          <div className="gap-2 text-sm font-medium text-muted-foreground">
            {items.map((item, i) => (
              <>
                {i !== 0 && <span className="mx-1">/</span>}
                {item.url ? (
                  <Link
                    to={item.url}
                    className="truncate hover:text-accent-foreground"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="truncate">{item.name}</span>
                )}
              </>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Search Button */}
        <LargeSearchToggle
          hideIfDisabled
          className="w-full my-auto max-md:hidden max-w-[240px]"
        />
        <ModeToggle />
      </div>
    </header>
  );
}
