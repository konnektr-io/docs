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

        {/* Breadcrumbs using shadcn/ui components */}
        {items.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                  <>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem key={index}>
                      {item.url ? (
                        <BreadcrumbLink
                          asChild
                          className={!isLast ? "text-muted-foreground" : ""}
                        >
                          <Link to={item.url}>{item.name}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage
                          className={!isLast ? "text-muted-foreground" : ""}
                        >
                          {item.name}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
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
