// Renders growth-plan.html to PDF with Chromium.
// The cover is printed without the running footer, the rest with it,
// and the two are merged by merge.py.
//
//   node docs/growth-plan/render.mjs
//
// Uses the Playwright install from the DuoStack project.
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const require = createRequire('D:/All_Projects_Mine/DuoStack/package.json')
const { chromium } = require('playwright')

const here = dirname(fileURLToPath(import.meta.url))
const url = pathToFileURL(resolve(here, 'growth-plan.html')).href

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

await page.pdf({
  path: resolve(here, '_cover.pdf'),
  format: 'A4',
  printBackground: true,
  pageRanges: '1',
  preferCSSPageSize: true
})

const footer = `
  <div style="width:100%; font-family: Helvetica, Arial, sans-serif; font-size:7.5px; color:#7B7D95;
              padding: 0 17mm; display:flex; justify-content:space-between; letter-spacing:0.06em;">
    <span>ALQAIRA WHOLESALE · GROWTH PLAN · SEPTEMBER 2026</span>
    <span><span class="pageNumber"></span></span>
  </div>`

await page.pdf({
  path: resolve(here, '_body.pdf'),
  format: 'A4',
  printBackground: true,
  pageRanges: '2-',
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: footer
})

await browser.close()
console.log('rendered')
