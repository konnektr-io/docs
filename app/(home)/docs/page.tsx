import Link from 'next/link';
import { Database, LayoutDashboard, Terminal, Code2, Waypoints, Hammer, Compass, Zap, ArrowRight, Book } from 'lucide-react';
import { Card, Cards } from 'fumadocs-ui/components/card';

export default function DocsPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center text-center mb-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Konnektr <span className="text-primary">Docs</span>
        </h1>
        <p className="text-lg md:text-xl text-fd-muted-foreground max-w-[800px] leading-relaxed">
          Everything you need to build, manage, and scale digital twin solutions with the Konnektr Platform.
        </p>
      </div>

      <div className="mb-20">
        <div className="flex items-center justify-between mb-8 px-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Konnektr Graph
            </h2>
            <p className="text-fd-muted-foreground">The heart of your digital twin ecosystem.</p>
          </div>
          <Link 
            href="/docs/graph" 
            className="text-primary hover:underline flex items-center gap-1 font-medium hidden sm:flex"
          >
            Go to Graph Docs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <Cards>
          <Card
            href="/docs/graph/getting-started/quickstart"
            title="Quick Start"
            description="Deploy your first Graph instance and run your first query in under 5 minutes."
            icon={<Zap className="text-primary" />}
          />
          <Card
            href="/docs/graph/concepts/dtdl"
            title="DTDL & Models"
            description="Understand the Digital Twins Definition Language and how to model your world."
            icon={<Book className="text-primary" />}
          />
          <Card
            href="/docs/graph/how-to-guides/using-azure-digital-twins-sdks"
            title="Azure SDK Support"
            description="Use standard Azure Digital Twins SDKs with zero code changes."
            icon={<Code2 className="text-primary" />}
          />
          <Card
            href="/docs/graph/deployment-installation/self-host"
            title="Self-Hosting"
            description="Learn how to deploy Konnektr Graph in your own Kubernetes or Docker environment."
            icon={<Terminal className="text-primary" />}
          />
        </Cards>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <div className="col-span-full mb-2">
          <h2 className="text-2xl font-semibold">Other Platform Tools</h2>
          <p className="text-fd-muted-foreground mt-1">Specialized tools to extend your digital twin capabilities.</p>
        </div>
        
        <Link 
          href="/docs/ktrlplane"
          className="group p-6 rounded-2xl border bg-fd-card hover:bg-fd-accent transition-colors flex flex-col gap-4"
        >
          <LayoutDashboard className="h-8 w-8 text-fd-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <h3 className="font-semibold mb-1">KtrlPlane</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">Cloud control plane for users, organizations, and resource management.</p>
          </div>
        </Link>

        <Link 
           href="/docs/db-query-operator"
           className="group p-6 rounded-2xl border bg-fd-card hover:bg-fd-accent transition-colors flex flex-col gap-4"
        >
          <Terminal className="h-8 w-8 text-fd-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <h3 className="font-semibold mb-1">DB Query Operator</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">Bridge database state with Kubernetes infrastructure automatically.</p>
          </div>
        </Link>

        <Link 
          href="/docs/jexl"
          className="group p-6 rounded-2xl border bg-fd-card hover:bg-fd-accent transition-colors flex flex-col gap-4"
        >
          <Code2 className="h-8 w-8 text-fd-muted-foreground group-hover:text-primary transition-colors" />
          <div>
            <h3 className="font-semibold mb-1">Jexl Extended</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed">Powerful expression language with 80+ built-in functions.</p>
          </div>
        </Link>

        <div className="p-6 rounded-2xl border bg-fd-card opacity-60 flex flex-col gap-4 relative overflow-hidden">
            <span className="absolute top-4 right-4 text-[10px] font-bold bg-fd-muted px-2 py-0.5 rounded text-fd-muted-foreground tracking-wider uppercase">Soon</span>
            <Waypoints className="h-8 w-8 text-fd-muted-foreground" />
            <div>
              <h3 className="font-semibold mb-1">Konnektr Flow</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">Real-time data orchestration and event processing engine.</p>
            </div>
        </div>
      </div>
      
      <div className="mt-24 p-12 rounded-[2rem] bg-fd-primary text-fd-primary-foreground text-center relative overflow-hidden shadow-2xl shadow-fd-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
        <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to build?</h2>
        <p className="mb-8 opacity-90 max-w-[600px] mx-auto relative z-10">
          Deploy a managed Konnektr Graph instance in seconds and start modeling your physical assets digitally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Link 
            href="https://ktrlplane.konnektr.io/resources/create?resource_type=Konnektr.Graph"
            className="px-8 py-3 bg-fd-background text-fd-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Deploy Graph Now
          </Link>
          <Link 
            href="/docs/graph/getting-started/quickstart"
            className="px-8 py-3 dark bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            Read the Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
