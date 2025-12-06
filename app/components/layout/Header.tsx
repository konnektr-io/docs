import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, Database, GitBranch, Bot, Navigation, ChevronDown, LogIn } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

const navigationProducts = [
  {
    name: "Graph",
    path: "/docs/graph",
    status: "available",
    navDescription: "Twin runtime & graph database",
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
];

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
            >
              <img src="/konnektr.svg" alt="Konnektr Logo" className="h-7 w-7" />
              <span className="text-foreground tracking-tight">Konnektr</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-4">
              <DesktopNavigation />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ModeToggle />
            
            {/* Sign In / Portal CTA */}
            <a
              href="https://ktrlplane.konnektr.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </a>
            
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
          {navigationProducts.map((product) => (
            <Link
              key={product.path}
              to={product.path}
              onClick={() => setOpen(false)}
              className="w-full text-left flex flex-col gap-1 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {product.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.navDescription}
              </span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileNavigation({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

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
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Documentation
            </h3>
            <div className="space-y-2">
              {navigationProducts.map((product) => (
                <Link
                  key={product.path}
                  to={product.path}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left flex flex-col gap-2 p-3 rounded-lg hover:bg-accent transition-colors block"
                >
                  <span className="font-medium text-foreground">
                    {product.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.navDescription}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile Sign In */}
          <div className="pt-4 border-t">
            <a
              href="https://ktrlplane.konnektr.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4" />
              Sign In to Portal
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
