import type { NextConfig } from 'next'
import { internalRedirects, legacyRedirects } from './lib/redirects'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // 301 das rotas antigas (lib/redirects.ts).
  async redirects() {
    return [...internalRedirects, ...legacyRedirects]
  },
}

export default nextConfig
