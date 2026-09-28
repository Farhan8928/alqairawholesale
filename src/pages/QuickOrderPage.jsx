import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import QtyStepper from '../components/QtyStepper.jsx'
import TierMeter from '../components/TierMeter.jsx'
import { useOrder, runOf, packSize } from '../context/OrderContext.jsx'
import { products, inr } from '../data/products.js'
import { categories } from '../data/categories.js'
import { MIN_ORDER_VALUE } from '../data/business.js'

/**
 * Every style on one screen, one row each — the page a repeat buyer uses
 * when they already know the codes. Pack quantities write straight to the
 * order sheet; size-level edits still go through the product drawer.
 */
export default function QuickOrderPage() {
  const { lines, summary, addPacks, openProduct, openSheet } = useOrder()
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = 'Quick order — ALQAIRA Wholesale'
  }, [])

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return categories
      .map((c) => ({
        ...c,
        items: products.filter(
          (p) => p.category === c.key && (!needle || `${p.code} ${p.name} ${p.colour}`.toLowerCase().includes(needle))
        )
      }))
      .filter((g) => g.items.length)
  }, [q])

  return (
    <div className="container-x pb-32 pt-10 sm:pt-14">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="display text-4xl sm:text-5xl">Quick order</h1>
          <p className="mt-3 max-w-xl text-[15px] text-navy-900/65">
            Key in packs for every style you want. One pack is one piece of every size. For uneven sizes, open the
            style and split it by hand.
          </p>
        </div>
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Filter by style code or name</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-900/45" />
          <input type="search" placeholder="Filter by code or name" value={q} onChange={(e) => setQ(e.target.value)} className="field pl-9" />
        </label>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {groups.map((g) => (
            <section key={g.key} className="mb-10">
              <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-900/55">{g.name}</h2>
              <div className="overflow-x-auto border-y border-line">
                <table className="w-full min-w-[640px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-line text-[12px] text-navy-900/55">
                      <th className="py-2.5 font-medium">Style</th>
                      <th className="py-2.5 font-medium">Pack</th>
                      <th className="py-2.5 text-right font-medium">Per pc</th>
                      <th className="py-2.5 pl-6 font-medium">Packs</th>
                      <th className="py-2.5 text-right font-medium">Pcs</th>
                      <th className="py-2.5 text-right font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {g.items.map((p) => {
                      const run = runOf(p)
                      const sizes = lines[p.code] ?? {}
                      const pieces = Object.values(sizes).reduce((a, b) => a + b, 0)
                      const vals = run.map((s) => sizes[s] ?? 0)
                      const even = vals.every((v) => v === vals[0])
                      return (
                        <tr key={p.code} className={pieces ? 'bg-ivory-50' : ''}>
                          <td className="py-2.5 pr-3">
                            <button type="button" onClick={() => openProduct(p.code)} className="flex items-center gap-3 text-left">
                              <img src={p.images[0]} alt="" loading="lazy" className="h-14 w-11 shrink-0 object-cover" />
                              <span>
                                <span className="num block text-[11px] font-semibold tracking-wider text-navy-900/50">{p.code}</span>
                                <span className="block font-semibold hover:underline">{p.name}</span>
                                <span className="block text-[12px] text-navy-900/55">{p.colour}</span>
                              </span>
                            </button>
                          </td>
                          <td className="num py-2.5 pr-3 text-[13px] text-navy-900/65">
                            {packSize(p)} pcs
                            <span className="block text-[11px]">{run[0]}–{run[run.length - 1]}</span>
                          </td>
                          <td className="num py-2.5 text-right font-semibold">{inr(p.price)}</td>
                          <td className="py-2.5 pl-6">
                            {even ? (
                              <QtyStepper size="sm" value={vals[0]} label={`${p.code} packs`} onChange={(n) => addPacks(p.code, n - vals[0])} />
                            ) : (
                              <button type="button" onClick={() => openProduct(p.code)} className="text-[13px] font-semibold underline underline-offset-4">
                                Custom split — edit
                              </button>
                            )}
                          </td>
                          <td className="num py-2.5 text-right">{pieces || '—'}</td>
                          <td className="num py-2.5 text-right font-semibold">{pieces ? inr(pieces * p.price) : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
          {!groups.length && <p className="py-16 text-center text-navy-900/60">No style matches “{q}”.</p>}
        </div>

        {/* Running summary */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="border border-line bg-ivory-50 p-5">
            <p className="text-sm font-semibold">Running total</p>
            <dl className="num mt-4 space-y-2 text-[14px]">
              <div className="flex justify-between"><dt className="text-navy-900/65">Pieces</dt><dd>{summary.pieces}</dd></div>
              <div className="flex justify-between"><dt className="text-navy-900/65">Gross</dt><dd>{inr(summary.gross)}</dd></div>
              {summary.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-navy-900/65">{summary.tier.label} −{Math.round(summary.tier.off * 100)}%</dt>
                  <dd>−{inr(summary.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-2 text-base font-bold">
                <dt>Before GST</dt>
                <dd>{inr(summary.taxable)}</dd>
              </div>
            </dl>
            <div className="mt-5">
              <TierMeter pieces={summary.pieces} />
            </div>
            {summary.shortBy > 0 && summary.pieces > 0 && (
              <p className="num mt-3 text-[13px] text-navy-900/75">
                {inr(summary.shortBy)} short of the {inr(MIN_ORDER_VALUE)} minimum.
              </p>
            )}
            <button type="button" onClick={openSheet} disabled={!summary.pieces} className="btn btn-primary mt-5 w-full">
              Review order sheet
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
