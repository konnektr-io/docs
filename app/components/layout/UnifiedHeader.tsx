import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "../ui/mode-toggle";
import { LargeSearchToggle } from "fumadocs-ui/components/layout/search-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ChevronDown,
  Menu,
  Database,
  GitBranch,
  Bot,
  LogIn,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const navigationProducts = [
  {
    name: "Graph",
    path: "/docs/graph",
    status: "available",
    navDescription: "Digital twin runtime & graph database",
    icon: Database,
  },
  {
    name: "Ktrlplane",
    path: "/docs/ktrlplane",
    status: "available",
    navDescription: "Cloud control plane",
    icon: GitBranch,
  },
  {
    name: "Jexl",
    path: "/docs/jexl",
    status: "available",
    navDescription: "JavaScript expression language",
    icon: Bot,
  },
  {
    name: "DB Query Operator",
    path: "/docs/db-query-operator",
    status: "available",
    navDescription: "Kubernetes operator for database-driven deployments",
    icon: Database,
  },
];

interface UnifiedHeaderProps {
  showSidebarTrigger?: boolean;
}

export default function UnifiedHeader({
  showSidebarTrigger = false,
}: UnifiedHeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Mobile Navigation Trigger */}
            {showSidebarTrigger && <SidebarTrigger className="md:hidden" />}

            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
            >
              <img
                src="/konnektr.svg"
                alt="Konnektr Logo"
                className="h-7 w-7"
              />
              <span>Konnektr</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-4">
              <DesktopNavigation />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Button */}
            <LargeSearchToggle
              hideIfDisabled
              className="w-full my-auto max-md:hidden max-w-[240px]"
            />

            <ModeToggle />

            {/* Sign In Button - Desktop */}
            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden md:flex"
            >
              <a
                href="https://ktrlplane.konnektr.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </a>
            </Button>

            {/* Mobile Navigation */}
            <MobileNavigation className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}

function DesktopNavigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-9 px-4 py-2 group">
          <span>Documentation</span>
          <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-2">
          {navigationProducts.map((product) => {
            const Icon = product.icon;
            const isActive = location.pathname.startsWith(product.path);

            return (
              <Link
                key={product.name}
                to={product.path}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors ${
                  isActive ? "bg-accent" : ""
                }`}
              >
                <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm leading-none">
                      {product.name}
                    </p>
                    {product.status === "coming-soon" && (
                      <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {product.navDescription}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileNavigation({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className={className}>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left text-foreground">
            Navigation
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground">
              Documentation
            </h3>
            <div className="space-y-1">
              {navigationProducts.map((product) => {
                const Icon = product.icon;
                const isActive = location.pathname.startsWith(product.path);

                return (
                  <Link
                    key={product.name}
                    to={product.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors ${
                      isActive ? "bg-accent" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{product.name}</span>
                    {product.status === "coming-soon" && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        Coming Soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sign In Button - Mobile */}
          <div className="pt-4 border-t">
            <Button asChild variant="default" className="w-full">
              <a
                href="https://ktrlplane.konnektr.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
