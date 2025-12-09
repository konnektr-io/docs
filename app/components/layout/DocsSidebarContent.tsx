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
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Link, useLocation, useNavigate } from "react-router";
import { useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { navigationProducts } from "../../lib/navigation-products";
import { ChevronDown } from "lucide-react";

interface DocsSidebarContentProps {
  tree: PageTree.Root;
}

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
  const navigate = useNavigate();

  // Determine current product from pathname
  const currentProduct = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments[0] === "docs" && pathSegments[1]) {
      return pathSegments[1];
    }
    return "graph"; // default to Graph
  }, [location.pathname]);

  // Find the current product object for the switcher
  const currentProductObj =
    navigationProducts.find((p) => p.path === `/docs/${currentProduct}`) ||
    navigationProducts[0];

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
      {/* Product Switcher */}
      <SidebarGroup>
        <SidebarGroupLabel>Product</SidebarGroupLabel>
        <div className="px-3 pt-2 pb-3">
          <Select
            value={currentProductObj.path}
            onValueChange={(val) => {
              navigate(val);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                <div className="flex flex-col items-start">
                  <span className="truncate font-medium text-sm">
                    {currentProductObj.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentProductObj.navDescription}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {navigationProducts.map((product) => (
                <SelectItem key={product.path} value={product.path}>
                  <div className="flex flex-col">
                    <span>{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.navDescription}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <SidebarMenu className="space-y-1">
          {renderTreeNodes(productTree.children, location.pathname, 0)}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
