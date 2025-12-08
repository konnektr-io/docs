import type { Route } from "./+types/home";
import { redirect } from "react-router";

export function loader({}: Route.LoaderArgs) {
  return redirect("/docs");
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

// This route just redirects to /docs - see loader above
export default function Home() {
  return null;
}
