import './env'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	transpilePackages: ['@workspace/ui'],
	cacheComponents: true,
	reactStrictMode: true,
	poweredByHeader: false
}

export default nextConfig
