import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { productByCode, inr } from '../data/products.js'
import { sizeRuns } from '../data/categories.js'
import { GST_RATE, MIN_ORDER_VALUE, contact, tierFor, nextTier } from '../data/business.js'

/**
 * The order sheet — wholesale's version of a cart.
 *
 * State shape: { [productCode]: { [size]: qty } }. Quantities are pieces,
 * never packs; "add a pack" is just +1 on every size in the run. Keeping one
 * unit means a buyer can add two packs and then nudge one size by hand without
 * the sheet having to reconcile two representations.
 */

const STORAGE_KEY = 'aq-wholesale-order-v1'
const OrderContext = createContext(null)

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    // Drop anything the line sheet no longer carries.
    return Object.fromEntries(Object.entries(parsed).filter(([code]) => productByCode[code]))
  } catch {
    return {}
  }
}

export const runOf = (p) => sizeRuns[p.run]
export const packSize = (p) => runOf(p).length

const sumLine = (sizes) => Object.values(sizes).reduce((a, b) => a + b, 0)

export function OrderProvider({ children }) {
  const [lines, setLines] = useState(load)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* private mode — the sheet still works for this visit */
    }
  }, [lines])

  const setQty = useCallback((code, size, qty) => {
    setLines((prev) => {
      const sizes = { ...(prev[code] ?? {}) }
      const n = Math.max(0, Math.min(9999, Math.floor(Number(qty) || 0)))
      if (n === 0) delete sizes[size]
      else sizes[size] = n
      const next = { ...prev }
      if (Object.keys(sizes).length === 0) delete next[code]
      else next[code] = sizes
      return next
    })
  }, [])

  const addPacks = useCallback((code, packs = 1) => {
    const p = productByCode[code]
    if (!p) return
    setLines((prev) => {
      const sizes = { ...(prev[code] ?? {}) }
      for (const s of runOf(p)) {
        const n = (sizes[s] ?? 0) + packs
        if (n <= 0) delete sizes[s]
        else sizes[s] = n
      }
      const next = { ...prev }
      if (Object.keys(sizes).length === 0) delete next[code]
      else next[code] = sizes
      return next
    })
  }, [])

  const setLine = useCallback((code, sizes) => {
    setLines((prev) => {
      const clean = Object.fromEntries(Object.entries(sizes).filter(([, n]) => n > 0))
      const next = { ...prev }
      if (Object.keys(clean).length === 0) delete next[code]
      else next[code] = clean
      return next
    })
  }, [])

  const removeLine = useCallback((code) => {
    setLines((prev) => {
      const next = { ...prev }
      delete next[code]
      return next
    })
  }, [])

  const clear = useCallback(() => setLines({}), [])

  const summary = useMemo(() => {
    const rows = Object.entries(lines).map(([code, sizes]) => {
      const p = productByCode[code]
      const pieces = sumLine(sizes)
      return {
        product: p,
        sizes,
        pieces,
        value: pieces * p.price,
        // A style below one pack's worth of pieces is flagged, not blocked —
        // the buyer may still be filling it in.
        belowMoq: pieces < packSize(p)
      }
    })
    const pieces = rows.reduce((a, r) => a + r.pieces, 0)
    const gross = rows.reduce((a, r) => a + r.value, 0)
    const tier = tierFor(pieces)
    const discount = gross * tier.off
    const taxable = gross - discount
    const gst = taxable * GST_RATE
    return {
      rows,
      styles: rows.length,
      pieces,
      gross,
      tier,
      next: nextTier(pieces),
      discount,
      taxable,
      gst,
      total: taxable + gst,
      shortBy: Math.max(0, MIN_ORDER_VALUE - taxable),
      moqIssues: rows.filter((r) => r.belowMoq).length
    }
  }, [lines])

  const value = useMemo(
    () => ({
      lines,
      summary,
      setQty,
      addPacks,
      setLine,
      removeLine,
      clear,
      sheetOpen,
      openSheet: () => setSheetOpen(true),
      closeSheet: () => setSheetOpen(false),
      activeCode,
      openProduct: (code) => setActiveCode(code),
      closeProduct: () => setActiveCode(null)
    }),
    [lines, summary, setQty, addPacks, setLine, removeLine, clear, sheetOpen, activeCode]
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used inside <OrderProvider>')
  return ctx
}

/* ───────────────────────── export helpers ───────────────────────── */

export function whatsappLink(text) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`
}

export function orderMessage(summary, buyer = {}) {
  const out = ['*Wholesale order — ALQAIRA*', '']
  if (buyer.name) out.push(`Business: ${buyer.name}`)
  if (buyer.city) out.push(`City: ${buyer.city}`)
  if (buyer.gstin) out.push(`GSTIN: ${buyer.gstin}`)
  if (buyer.name || buyer.city || buyer.gstin) out.push('')

  summary.rows.forEach((r, i) => {
    const split = runOf(r.product)
      .filter((s) => r.sizes[s])
      .map((s) => `${s}×${r.sizes[s]}`)
      .join(', ')
    out.push(`${i + 1}. ${r.product.code} ${r.product.name} (${r.product.colour})`)
    out.push(`   ${split} = ${r.pieces} pcs @ ${inr(r.product.price)}`)
  })

  out.push('')
  out.push(`Pieces: ${summary.pieces} across ${summary.styles} styles`)
  out.push(`Gross: ${inr(summary.gross)}`)
  if (summary.discount > 0) {
    out.push(`${summary.tier.label} tier −${Math.round(summary.tier.off * 100)}%: −${inr(summary.discount)}`)
  }
  out.push(`GST ${Math.round(GST_RATE * 100)}%: ${inr(summary.gst)}`)
  out.push(`*Estimated total: ${inr(summary.total)}*`)
  out.push('')
  out.push('Please send a proforma invoice.')
  return out.join('\n')
}

export function downloadCsv(summary) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`
  const rows = [['Code', 'Style', 'Colour', 'Size', 'Qty', 'Unit price (INR)', 'Line (INR)']]
  summary.rows.forEach((r) => {
    runOf(r.product)
      .filter((s) => r.sizes[s])
      .forEach((s) => {
        rows.push([r.product.code, r.product.name, r.product.colour, s, r.sizes[s], r.product.price, r.sizes[s] * r.product.price])
      })
  })
  rows.push([])
  rows.push(['', '', '', 'Pieces', summary.pieces, 'Gross', Math.round(summary.gross)])
  rows.push(['', '', '', '', '', `Tier discount (${summary.tier.label})`, -Math.round(summary.discount)])
  rows.push(['', '', '', '', '', `GST ${Math.round(GST_RATE * 100)}%`, Math.round(summary.gst)])
  rows.push(['', '', '', '', '', 'Estimated total', Math.round(summary.total)])

  const csv = rows.map((r) => r.map(esc).join(',')).join('\r\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `alqaira-order-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
