import type { PageTree } from "fumadocs-core/server";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Link, useLocation } from "react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DocsSidebarContentProps {
  tree: PageTree.Root;
}

// Product configuration with primary and secondary products
const PRIMARY_PRODUCTS = [
  {
    name: "Assembler",
    slug: "assembler",
    status: "coming-soon",
    description: "AI-powered digital twin builder",
  },
  {
    name: "Graph",
    slug: "graph",
    status: "available",
    description: "Scalable graph database & API",
  },
  {
    name: "Flow",
    slug: "flow",
    status: "coming-soon",
    description: "Real-time data & event orchestrator",
  },
  {
    name: "Compass",
    slug: "compass",
    status: "coming-soon",
    description: "Analytics & insights platform",
  },
];

const SECONDARY_PRODUCTS = [
  {
    name: "KtrlPlane",
    slug: "ktrlplane",
    status: "available",
    description: "Cloud platform for billing, RBAC & resource management",
  },
  {
    name: "DBQueryOperator",
    slug: "dbqueryoperator",
    status: "available",
    description: "Kubernetes operator for database-driven deployments",
  },
  {
    name: "Jexl",
    slug: "jexl",
    status: "available",
    description: "Expression language with interactive playground",
  },
];

const ALL_PRODUCTS = [...PRIMARY_PRODUCTS, ...SECONDARY_PRODUCTS];

// Create a collapsible folder component using proper shadcn pattern with enhanced styling
function CollapsibleFolder({
  node,
  currentPath,
  level,
}: {
  node: any;
  currentPath: string;
  level: number;
}) {
  // Check if this folder has an index page
  const indexPage = node.children?.find(
    (child: any) => child.type === "page" && child.name === node.name
  );

  const isActive = indexPage && currentPath === indexPage.url;

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <div className="flex items-center w-full">
          {/* Clickable folder name that navigates to index if it exists */}
          {indexPage ? (
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={`
                flex-1 justify-start hover:bg-accent/50 transition-colors
                ${
                  level === 0
                    ? "font-semibold text-foreground py-2"
                    : "font-medium"
                }
                ${
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                    : ""
                }
              `}
            >
              <Link to={indexPage.url}>
                <span
                  className={level === 0 ? "text-sm" : "text-sm font-normal"}
                >
                  {node.name}
                </span>
              </Link>
            </SidebarMenuButton>
          ) : (
            <div
              className={`
                flex-1 px-2 py-1.5 text-left
                ${
                  level === 0
                    ? "font-semibold text-foreground py-2"
                    : "font-medium"
                }
              `}
            >
              <span className={level === 0 ? "text-sm" : "text-sm font-normal"}>
                {node.name}
              </span>
            </div>
          )}

          {/* Collapsible trigger for expand/collapse */}
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              size="sm"
              className="w-6 h-6 p-0 hover:bg-accent/50 transition-colors"
            >
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]/collapsible:rotate-[-90deg]" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <SidebarMenuSub
            className={level === 0 ? "ml-2 border-l border-border/50" : ""}
          >
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
      const isActive = currentPath === node.url;

      if (level > 0) {
        return (
          <SidebarMenuSubItem key={node.url}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={`
                transition-colors hover:bg-accent/50
                ${
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                    : ""
                }
              `}
            >
              <Link to={node.url}>
                <span
                  className={`truncate ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                >
                  {node.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        );
      } else {
        return (
          <SidebarMenuItem key={node.url}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={`
                transition-colors hover:bg-accent/50
                ${
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                    : ""
                }
              `}
            >
              <Link to={node.url}>
                <span
                  className={`truncate ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                >
                  {node.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }
    } else if (node.type === "separator") {
      return (
        <li key={`sep-${level}-${idx}`} className="my-3">
          <div className="border-t border-border/60" />
        </li>
      );
    }
    return null;
  });
}

export default function DocsSidebarContent({ tree }: DocsSidebarContentProps) {
  const location = useLocation();
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Determine current product from pathname
  const currentProduct = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments[0] === "docs" && pathSegments[1]) {
      return pathSegments[1];
    }
    return "graph"; // default to Graph
  }, [location.pathname]);

  // Get current product details
  const currentProductInfo = useMemo(() => {
    return (
      ALL_PRODUCTS.find((product) => product.slug === currentProduct) ||
      PRIMARY_PRODUCTS[1]
    ); // default to Graph
  }, [currentProduct]);

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
      {/* Product Selector */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Product
        </SidebarGroupLabel>
        <div className="px-2">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left border border-border">
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="font-medium text-sm">
                  Konnektr {currentProductInfo.name}
                </span>
                <span
                  className="text-xs text-muted-foreground truncate"
                  // Allow full width truncation inside flex-1 container
                  title={currentProductInfo.description}
                >
                  {currentProductInfo.description}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 flex-none" />
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <div className="space-y-4">
                {/* Primary Products */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Products
                  </h4>
                  <div className="space-y-1">
                    {PRIMARY_PRODUCTS.map((product) => {
                      const isAvailable = product.status === "available";
                      const isCurrentProduct = currentProduct === product.slug;

                      return (
                        <Link
                          key={product.slug}
                          to={isAvailable ? `/docs/${product.slug}` : "#"}
                          onClick={() => {
                            setPopoverOpen(false);
                            if (!isAvailable) return false;
                          }}
                          className={`
                            w-full text-left flex flex-col gap-1 px-3 py-2 rounded-lg transition-colors
                            ${
                              isCurrentProduct
                                ? "bg-accent text-accent-foreground"
                                : isAvailable
                                ? "hover:bg-accent/50 cursor-pointer"
                                : "bg-muted/40 text-muted-foreground cursor-not-allowed opacity-60"
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">
                              Konnektr {product.name}
                            </span>
                            {product.status === "coming-soon" && (
                              <span className="text-xs text-muted-foreground">
                                Soon
                              </span>
                            )}
                          </div>
                          <span
                            className="text-xs text-muted-foreground truncate flex-1 min-w-0"
                            title={product.description}
                          >
                            {product.description}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Products */}
                <div className="border-t pt-3">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Platform & Tools
                  </h4>
                  <div className="space-y-1">
                    {SECONDARY_PRODUCTS.map((product) => {
                      const isAvailable = product.status === "available";
                      const isCurrentProduct = currentProduct === product.slug;

                      return (
                        <Link
                          key={product.slug}
                          to={isAvailable ? `/docs/${product.slug}` : "#"}
                          onClick={() => {
                            setPopoverOpen(false);
                            if (!isAvailable) return false;
                          }}
                          className={`
                            w-full text-left flex flex-col gap-1 px-3 py-2 rounded-lg transition-colors
                            ${
                              isCurrentProduct
                                ? "bg-accent text-accent-foreground"
                                : isAvailable
                                ? "hover:bg-accent/50 cursor-pointer"
                                : "bg-muted/40 text-muted-foreground cursor-not-allowed opacity-60"
                            }
                          `}
                        >
                          <span className="font-medium text-sm">
                            {product.name}
                          </span>
                          <span
                            className="text-xs text-muted-foreground truncate flex-1 min-w-0"
                            title={product.description}
                          >
                            {product.description}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarGroup>

      <SidebarSeparator className="my-4" />

      {/* Navigation Tree */}
      <SidebarGroup>
        <SidebarMenu className="space-y-1">
          {renderTreeNodes(productTree.children, location.pathname, 0)}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
