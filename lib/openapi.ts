import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  input: ["./content/openapi/graph/v1.json"],
  proxyUrl: "/api/proxy",
});
