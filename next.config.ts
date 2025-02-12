import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  serverRuntimeConfig: {},
  env: {},
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
  devIndicators: {
    appIsrStatus: false,
  },
  output: 'standalone',
}

export default nextConfig
