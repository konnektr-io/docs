import { createOpenAPI } from "fumadocs-openapi/server";

export const openapi = createOpenAPI({
  input: ["https://demo.api.graph.konnektr.io/openapi/v1.json"],
});
