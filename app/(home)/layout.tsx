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
                <NavbarMenuLink href="/docs/graph" className="md:row-span-2">
                  <div className="-mx-3 -mt-3 flex items-center justify-center h-32 bg-secondary/20 rounded-t-lg">
                    <Database className="h-12 w-12 text-primary" />
                  </div>
                  <p className="font-medium">Konnektr Graph</p>
                  <p className="text-fd-muted-foreground text-sm">
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

                <div className="lg:col-start-3 lg:row-span-2 flex flex-col gap-2 p-2">
                  <p className="text-xs font-semibold text-fd-muted-foreground uppercase px-2 mb-1">
                    Other Products
                  </p>
                  <Link href="/docs/ktrlplane" className="flex items-center gap-2 p-2 rounded-md hover:bg-fd-accent text-sm">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>KtrlPlane</span>
                  </Link>
                  <Link href="/docs/db-query-operator" className="flex items-center gap-2 p-2 rounded-md hover:bg-fd-accent text-sm">
                    <Terminal className="h-4 w-4" />
                    <span>DB Query Operator</span>
                  </Link>
                  <Link href="/docs/jexl" className="flex items-center gap-2 p-2 rounded-md hover:bg-fd-accent text-sm">
                    <Code2 className="h-4 w-4" />
                    <span>Jexl Extended</span>
                  </Link>
                  <div className="mt-auto pt-2 border-t flex flex-col gap-1">
                     <span className="text-[10px] text-fd-muted-foreground px-2">COMING SOON</span>
                     <div className="flex items-center gap-2 p-2 opacity-50 text-sm">
                        <Hammer className="h-4 w-4" />
                        <span>Assembler</span>
                     </div>
                     <div className="flex items-center gap-2 p-2 opacity-50 text-sm">
                        <Waypoints className="h-4 w-4" />
                        <span>Flow</span>
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
