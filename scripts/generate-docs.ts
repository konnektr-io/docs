import { generateFiles } from "fumadocs-openapi";
import { openapi } from "@/lib/openapi";
void generateFiles({
  input: openapi,
  output: "./content/docs/graph/reference/api",
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
  groupBy: "tag",
});
