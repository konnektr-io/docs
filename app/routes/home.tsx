import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import DocsLayout from "../components/layout/DocsLayout";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export async function loader({}: Route.LoaderArgs) {
  // Return the page tree for layout rendering
  return {
    tree: source.getPageTree(),
  };
}

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

export default function Home(props: Route.ComponentProps) {
  const navigate = useNavigate();
  const { tree } = props.loaderData;

  useEffect(() => {
    // Redirect immediately on mount
    navigate("/docs/", { replace: true });
  }, [navigate]);

  // Render the docs layout during redirect for seamless transition
  return (
    <DocsLayout {...baseOptions()} tree={tree}>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading documentation...</p>
        </div>
      </div>
    </DocsLayout>
  );
}
