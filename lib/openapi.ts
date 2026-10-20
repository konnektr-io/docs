import { createOpenAPI } from "fumadocs-openapi/server";

/**
 * The Graph OpenAPI document is checked in at content/openapi/graph/v1.json.
 *
 * There is no `proxyUrl`: Konnektr Graph is self-hosted, so every reader's API
 * lives at their own host. A single shared proxy origin cannot serve that, and an
 * open proxy would be an SSRF hole — the reference pages are rendered as static
 * documentation instead of an interactive playground.
 */
export const openapi = createOpenAPI({
  input: ["./content/openapi/graph/v1.json"],
});
