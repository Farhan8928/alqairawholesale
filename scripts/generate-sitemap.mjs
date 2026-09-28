// Writes dist/sitemap.xml after `vite build`.
// Routes are listed here rather than crawled — the site has only a handful.
import { writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE = 'https://wholesale.alqaira.com'
const routes = ['/', '/catalogue', '/quick-order', '/apply']

const out = resolve('dist')
if (!existsSync(out)) {
  console.error('dist/ not found — run `vite build` first.')
  process.exit(1)
}

const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync(resolve(out, 'sitemap.xml'), xml)
console.log(`sitemap.xml — ${routes.length} routes`)
