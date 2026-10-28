import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const publicAssetPattern = /\.(?:avif|gif|jpe?g|png|svg|webp|mp4|webm|glb|woff2?|ttf|otf|json)(?:[?#].*)?$/i

function prefixPublicPathsForPages() {
  let base = '/'

  return {
    name: 'prefix-public-paths-for-pages',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transform(code, id) {
      if (base === '/' || !id.includes('/src/') || !/\.[jt]sx?$/.test(id)) return null

      const withAssets = code.replace(/(["'`])\/(?!\/)([^"'`]+)\1/g, (match, quote, rawPath) => {
        const path = rawPath.replace(/^public\//, '')
        if (rawPath.startsWith('src/assets/') || !publicAssetPattern.test(path)) return match
        return `${quote}${base}${path}${quote}`
      })

      const routePaths = new Set(['', 'animacion', 'modelo-3d', 'paint', 'tutorial'])
      const withRoutes = withAssets.replace(/(\bhref\s*=\s*["'])\/([^"']*)(["'])/g, (match, prefix, path, quote) =>
        routePaths.has(path) ? `${prefix}${base}${path}${quote}` : match,
      )

      return withRoutes === code ? null : { code: withRoutes, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages uses a repository subpath; local dev and Vercel use the domain root.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), prefixPublicPathsForPages()],
})
