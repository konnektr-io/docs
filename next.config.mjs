import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: { turbopackUseSystemTlsCerts: true },
  async redirects () {
    return [
      {
        source: '/docs/graph',
        destination: '/docs/graph/introduction',
        permanent: true,
      },
      {
        source: '/docs/ktrlplane',
        destination: '/docs/ktrlplane/introduction',
        permanent: true,
      },
      {
        source: '/docs/db-query-operator',
        destination: '/docs/db-query-operator/introduction',
        permanent: true,
      },
      {
        source: '/docs/jexl',
        destination: '/docs/jexl/introduction',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
