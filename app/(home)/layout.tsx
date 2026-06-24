import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from "@/lib/layout.shared";
import { LayoutDashboard, Terminal, Code2 } from "lucide-react";
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
            <Link
              href="/docs"
              className="text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Documentation
            </Link>
          ),
        },
        ...linkItems,
      ]}
    >
      {children}
    </HomeLayout>
  );
}
