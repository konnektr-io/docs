import type { PageTree } from "fumadocs-core/server";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Link, useLocation } from "react-router";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DocsSidebarContentProps {
  tree: PageTree.Root;
}

// Product configuration - matches the products from home.tsx
const PRODUCTS = [
  { name: "Graph", slug: "graph", status: "available" },
  { name: "Flow", slug: "flow", status: "coming-soon" },
  { name: "Assembler", slug: "assembler", status: "coming-soon" },
  { name: "Compass", slug: "compass", status: "coming-soon" },
];

// Create a collapsible folder component using proper shadcn pattern
function CollapsibleFolder({
  node,
  currentPath,
  level,
}: {
  node: any;
  currentPath: string;
  level: number;
}) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="w-full justify-between">
            <span>{node.name}</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=closed]/collapsible:rotate-[-90deg]" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {renderTreeNodes(node.children, currentPath, level + 1)}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function renderTreeNodes(
  nodes: PageTree.Node[],
  currentPath: string,
  level: number = 0
): React.ReactNode[] {
  return nodes.map((node, idx) => {
    if (node.type === "folder") {
      return (
        <CollapsibleFolder
          key={`folder-${level}-${idx}`}
          node={node}
          currentPath={currentPath}
          level={level}
        />
      );
    } else if (node.type === "page") {
      if (level > 0) {
        return (
          <SidebarMenuSubItem key={node.url}>
            <SidebarMenuButton asChild isActive={currentPath === node.url}>
              <Link to={node.url}>
                <span className="truncate">{node.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        );
      } else {
        return (
          <SidebarMenuItem key={node.url}>
            <SidebarMenuButton asChild isActive={currentPath === node.url}>
              <Link to={node.url}>
                <span className="truncate">{node.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }
    } else if (node.type === "separator") {
      return (
        <li key={`sep-${level}-${idx}`} className="my-2">
          <div className="border-t border-border" />
        </li>
      );
    }
    return null;
  });
}

export default function DocsSidebarContent({ tree }: DocsSidebarContentProps) {
  const location = useLocation();

  // Determine current product from pathname
  const currentProduct = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments[0] === "docs" && pathSegments[1]) {
      return pathSegments[1];
    }
    return "graph"; // default to Graph
  }, [location.pathname]);

  // Filter tree to current product sections and remove main product index page
  const productTree = useMemo(() => {
    // Find the current product folder in the tree using $id field
    const productFolder = tree.children.find(
      (node: any) => node.type === "folder" && node.$id === currentProduct
    ) as any;

    if (productFolder && productFolder.children) {
      // Filter out the main product index page (first item is usually the main page)
      const filteredChildren = productFolder.children.filter(
        (child: any) =>
          !(child.type === "page" && child.$id?.endsWith("/index.mdx"))
      );

      return {
        ...tree,
        children: filteredChildren,
      };
    }

    // If no specific product folder found, return the full tree to show something
    return tree;
  }, [tree, currentProduct]);

  return (
    <SidebarContent className="flex-1 overflow-y-auto">
      {/* Products Menu Section */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Products
        </SidebarGroupLabel>
        <SidebarMenu>
          {PRODUCTS.map((product) => {
            const isActive = currentProduct === product.slug;
            const isAvailable = product.status === "available";

            return (
              <SidebarMenuItem key={product.slug}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  disabled={!isAvailable}
                >
                  <Link
                    to={isAvailable ? `/docs/${product.slug}` : "#"}
                    className="flex items-center justify-between"
                    {...(!isAvailable && {
                      onClick: (e) => e.preventDefault(),
                    })}
                  >
                    <span>Konnektr {product.name}</span>
                    {product.status === "coming-soon" && (
                      <span className="text-xs opacity-60">Soon</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      {/* Navigation Tree */}
      <SidebarGroup>
        <SidebarMenu>
          {renderTreeNodes(productTree.children, location.pathname, 0)}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
