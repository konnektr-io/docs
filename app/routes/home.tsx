import type { Route } from "./+types/home";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Link } from "react-router";
import { baseOptions } from "@/lib/layout.shared";
import { Bot, Database, GitBranch, Navigation } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Konnektr Documentation" },
    {
      name: "description",
      content:
        "Technical documentation, guides, and API references for the Konnektr Platform",
    },
  ];
}

const products = [
  {
    name: "Graph",
    description:
      "High-performance, ADT-compatible digital twin runtime and graph database",
    icon: Database,
    href: "/docs/graph",
    status: "available",
    sections: ["Getting Started", "Concepts", "API Reference", "How-to Guides"],
  },
  {
    name: "Flow",
    description: "Real-time data orchestration and event processing engine",
    icon: GitBranch,
    href: "/docs/flow",
    status: "coming-soon",
    sections: ["Pipeline Design", "Event Processing", "Integrations"],
  },
  {
    name: "Assembler",
    description: "AI-powered builder for creating digital twin models",
    icon: Bot,
    href: "/docs/assembler",
    status: "coming-soon",
    sections: ["Model Generation", "Data Mapping", "Deployment"],
  },
  {
    name: "Compass",
    description:
      "Analytics and visualization platform for digital twin insights",
    icon: Navigation,
    href: "/docs/compass",
    status: "coming-soon",
    sections: ["Dashboards", "Analytics", "Reporting"],
  },
];

export default function Home({}: Route.ComponentProps) {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Konnektr Platform Documentation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive documentation, guides, and API references for the
            Konnektr Platform. Build high-performance digital twin applications
            with our suite of integrated tools.
          </p>
        </div>

        {/* Products Documentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.name}
              className="group relative overflow-hidden rounded-xl border bg-card p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <product.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    {product.name}
                    {product.status === "available" ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        Coming Soon
                      </span>
                    )}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Documentation Sections */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Documentation Sections:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sections.map((section) => (
                    <span
                      key={section}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                {product.status === "available" ? (
                  <Link
                    to={product.href}
                    className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    reloadDocument
                  >
                    View Documentation
                  </Link>
                ) : (
                  <div className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-muted text-muted-foreground cursor-not-allowed">
                    Documentation Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            New to Konnektr? Start with our Graph documentation to learn the
            fundamentals of digital twin development.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/docs/graph"
              className="inline-flex items-center px-6 py-3 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started with Graph
            </Link>
            <Link
              to="/docs/graph/reference/api-reference"
              className="inline-flex items-center px-6 py-3 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              API Reference
            </Link>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}
