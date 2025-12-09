import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Redirect root to /docs via home.tsx loader
  index("routes/home.tsx"),
  route("docs/*", "docs/page.tsx"),
  route("api/search", "docs/search.ts"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
] satisfies RouteConfig;
