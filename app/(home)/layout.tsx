import { HomeLayout } from 'fumadocs-ui/layouts/home';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";
import { baseOptions, linkItems } from "@/lib/layout.shared";
import { Book, ComponentIcon, Pencil, PlusIcon, Server, Database, LayoutDashboard, Terminal, Code2, Waypoints, Compass, Zap, Hammer } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: "menu",
          on: "menu",
          text: "Documentation",
          items: [
            {
              text: "Konnektr Graph",
              url: "/docs/graph",
              icon: <Database />,
            },
            {
              text: "KtrlPlane",
              url: "/docs/ktrlplane",
              icon: <LayoutDashboard />,
            },
            {
              text: "DB Query Operator",
              url: "/docs/db-query-operator",
              icon: <Terminal />,
            },
            {
              text: "Jexl Extended",
              url: "/docs/jexl",
              icon: <Code2 />,
            },
          ],
        },
        {
          type: "custom",
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs">Documentation</Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs/graph/getting-started" className="md:row-span-2 group">
                  <div className="-mx-3 -mt-3 flex items-center justify-center h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-t-lg transition-colors group-hover:from-primary/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
                    <img src="/graph-icon.png" alt="Konnektr Graph" className="h-16 w-16 relative z-10 drop-shadow-2xl transition-transform group-hover:scale-110" />
                  </div>
                  <p className="font-medium mt-2">Konnektr Graph</p>
                  <p className="text-fd-muted-foreground text-sm leading-relaxed">
                    High-performance, Azure Digital Twins compatible graph database.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/graph/getting-started/quickstart"
                  className="lg:col-start-2"
                >
                  <Zap className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Quick Start</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Get your digital twin runtime running in minutes.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/graph/concepts/dtdl"
                  className="lg:col-start-2"
                >
                  <Book className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">DTDL & Models</p>
                  <p className="text-fd-muted-foreground text-sm">
                    Learn about Digital Twins Definition Language.
                  </p>
                </NavbarMenuLink>

                <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 flex flex-col p-2 pt-6">
                  <p className="text-[10px] font-bold text-fd-muted-foreground uppercase tracking-widest px-2 mb-3">
                    Other Products
                  </p>
                  <div className="flex flex-col gap-1">
                    <Link href="/docs/ktrlplane" className="flex items-center gap-3 p-2 rounded-lg hover:bg-fd-accent transition-colors text-sm group">
                      <LayoutDashboard className="h-4 w-4 text-fd-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium">KtrlPlane</span>
                    </Link>
                    <Link href="/docs/db-query-operator" className="flex items-center gap-3 p-2 rounded-lg hover:bg-fd-accent transition-colors text-sm group">
                      <Terminal className="h-4 w-4 text-fd-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium">DB Query Operator</span>
                    </Link>
                    <Link href="/docs/jexl" className="flex items-center gap-3 p-2 rounded-lg hover:bg-fd-accent transition-colors text-sm group">
                      <Code2 className="h-4 w-4 text-fd-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium">Jexl Extended</span>
                    </Link>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-fd-border/50 flex flex-col gap-1">
                     <p className="text-[10px] font-bold text-fd-muted-foreground/50 uppercase tracking-widest px-2 mb-2">COMING SOON</p>
                     <div className="flex items-center gap-3 p-2 opacity-40 text-sm grayscale">
                        <Hammer className="h-4 w-4" />
                        <span className="font-medium">Assembler</span>
                     </div>
                     <div className="flex items-center gap-3 p-2 opacity-40 text-sm grayscale">
                        <Waypoints className="h-4 w-4" />
                        <span className="font-medium">Flow</span>
                     </div>
                  </div>
                </div>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        ...linkItems,
      ]}
    >
      {children}
    </HomeLayout>
  );
}
