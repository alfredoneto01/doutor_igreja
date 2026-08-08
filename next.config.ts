import type { NextConfig } from 'next'
import { legacyRedirects } from './lib/redirects'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // 301 de caduaranha.com.br → doutorigreja.com.br, rota-a-rota (§2).
  // O mapa vive em lib/redirects.ts e é preenchido com o levantamento da Fase 0.6.
  async redirects() {
    return legacyRedirects
  },
}

export default nextConfig
