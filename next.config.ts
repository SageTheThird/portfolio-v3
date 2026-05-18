import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    viewTransition: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
    ],
  },
};

export default config;
