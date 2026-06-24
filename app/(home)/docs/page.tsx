import Link from "next/link";
import {
  LayoutDashboard,
  Terminal,
  Code2,
} from "lucide-react";
import { Card, Cards } from "fumadocs-ui/components/card";
import { createMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return createMetadata({
    title: "Konnektr Docs - Documentation Portal",
    description:
      "Everything you need to build, manage, and scale with Konnektr platform tools.",
  });
}

export default function DocsPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--fd-layout-width)] px-6 py-12 md:py-24">
      <div className="flex flex-col items-center text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Konnektr <span className="text-primary">Docs</span>
        </h1>
        <p className="text-lg md:text-xl text-fd-muted-foreground max-w-[800px] leading-relaxed">
          Documentation for Konnektr platform tools — control planes, Kubernetes operators, and expression languages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <Link
          href="/docs/ktrlplane"
          className="group p-6 rounded-2xl border bg-fd-card hover:bg-fd-accent transition-colors flex flex-col gap-4"
        >
          <LayoutDashboard className="h-8 w-8 text-fd-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <h3 className="font-semibold mb-1">KtrlPlane</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Cloud control plane for users, organizations, and resource management.
            </p>
          </div>
        </Link>

        <Link
          href="/docs/db-query-operator"
          className="group p-6 rounded-2xl border bg-fd-card hover:bg-fd-accent transition-colors flex flex-col gap-4"
        >
          <Terminal className="h-8 w-8 text-fd-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <h3 className="font-semibold mb-1">DB Query Operator</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Bridge database state with Kubernetes infrastructure automatically.
            </p>
          </div>
        </Link>

        <Link
          href="/docs/jexl"
          className="group p-6 rounded-2xl border bg-fd-card hover:bg-fd-accent transition-colors flex flex-col gap-4"
        >
          <Code2 className="h-8 w-8 text-fd-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <h3 className="font-semibold mb-1">Jexl Extended</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">
              Powerful expression language with 80+ built-in functions.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
