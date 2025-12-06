import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // Root route for homepage (uses same component but different id)
  index('docs/page.tsx', { id: 'home' }),
  // Catch-all for nested docs paths
  route('docs/*', 'docs/page.tsx', { id: 'docs' }),
  route('api/search', 'docs/search.ts'),
] satisfies RouteConfig;
