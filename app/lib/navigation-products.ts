// Centralized product navigation list for docs header and sidebar
import { Database, GitBranch, Bot } from "lucide-react";

export const navigationProducts = [
  {
    name: "Graph",
    path: "/docs/graph",
    status: "available",
    navDescription: "Digital twin runtime & graph database",
    icon: Database,
  },
  {
    name: "Ktrlplane",
    path: "/docs/ktrlplane",
    status: "available",
    navDescription: "Cloud control plane",
    icon: GitBranch,
  },
  {
    name: "Jexl",
    path: "/docs/jexl",
    status: "available",
    navDescription: "JavaScript expression language",
    icon: Bot,
  },
  {
    name: "DB Query Operator",
    path: "/docs/db-query-operator",
    status: "available",
    navDescription: "Kubernetes operator for database-driven deployments",
    icon: Database,
  },
];
