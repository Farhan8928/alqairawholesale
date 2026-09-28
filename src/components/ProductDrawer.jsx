import { useEffect, useState } from 'react'
import { AlertTriangle, MessageCircle } from 'lucide-react'
import Drawer from './Drawer.jsx'
import QtyStepper from './QtyStepper.jsx'
import { useOrder, runOf, packSize, whatsappLink } from '../context/OrderContext.jsx'
import { productByCode, inr, marginOf } from '../data/products.js'
import { sizeRunLabel } from '../data/categories.js'
import { tiers } from '../data/business.js'

export default function ProductDrawer() {
  const { activeCode, closeProduct } = useOrder()
  const p = activeCode ? productByCode[activeCode] : null
  return (
    <Drawer open={!!p} onClose={closeProduct} title={p ? `${p.code} · ${p.name}` : ''} width="max-w-[980px]">
      {p && <ProductBody key={p.code} p={p} />}
    </Drawer>
  )
}

function ProductBody({ p }) {
  const { lines, setLine, closeProduct, openSheet } = useOrder()
  const run = runOf(p)
  const pack = packSize(p)
  const [img, setImg] = useState(0)

  // Draft is local until the buyer commits, so fiddling with sizes does not
  // churn the order sheet (and its tier maths) on every keystroke.
  // A style not yet on the order opens at one pack — the minimum.
  const [draft, setDraft] = useState(() =>
    lines[p.code] ? { ...lines[p.code] } : Object.fromEntries(run.map((s) => [s, 1]))
  )
  const [mode, setMode] = useState(() => {
    const cur = lines[p.code]
    if (!cur) return 'pack'
    const vals = run.map((s) => cur[s] ?? 0)
    return vals.every((v) => v === vals[0]) ? 'pack' : 'split'
  })

  useEffect(() => setImg(0), [p.code])

  const pieces = run.reduce((a, s) => a + (draft[s] ?? 0), 0)
  const packs = Math.min(...run.map((s) => draft[s] ?? 0))
  const inOrder = !!lines[p.code]
  const changed = JSON.stringify(Object.fromEntries(run.filter((s) => draft[s]).map((s) => [s, draft[s]]))) !==
    JSON.stringify(Object.fromEntries(run.filter((s) => lines[p.code]?.[s]).map((s) => [s, lines[p.code][s]])))

  const setPacks = (n) => setDraft(Object.fromEntries(run.map((s) => [s, n])))
  const setSize = (s, n) => setDraft((d) => ({ ...d, [s]: n }))

  const commit = (thenOpenSheet) => {
    setLine(p.code, draft)
    closeProduct()
    if (thenOpenSheet) openSheet()
  }

  const sampleMsg = `Hi, I'd like to buy a sample of ${p.code} ${p.name} (${p.colour}). Size: `

  return (
    <div className="grid md:grid-cols-[1.05fr_1fr]">
      {/* ── Gallery ── */}
      <div className="bg-ivory-200 md:sticky md:top-0 md:h-[calc(100vh-3.5rem)] md:self-start">
        <div className="relative aspect-[4/5] md:aspect-auto md:h-[calc(100%-88px)]">
          <img src={p.images[img]} alt={`${p.name}, view ${img + 1} of 4`} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-1 p-1 md:h-[88px]">
          {p.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setImg(i)}
              aria-label={`Show view ${i + 1}`}
              className={`relative h-20 overflow-hidden md:h-full ${i === img ? 'outline outline-2 -outline-offset-2 outline-navy-900' : 'opacity-70 hover:opacity-100'}`}
            >
              <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Details + ordering ── */}
      <div className="px-5 py-6 sm:px-7">
        <p className="num text-[12px] font-semibold tracking-wider text-navy-900/50">{p.code}</p>
        <h2 className="display mt-1 text-3xl">{p.name}</h2>
        <p className="mt-1.5 text-sm text-navy-900/65">
          {p.colour} · {p.audience} · {p.dispatch}
        </p>

        {/* Price + margin */}
        <div className="mt-5 flex items-end justify-between gap-4 border-y border-line py-4">
          <div>
            <p className="text-[12px] text-navy-900/55">Wholesale, per piece</p>
            <p className="num text-3xl font-bold">{inr(p.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-navy-900/55">Printed MRP</p>
            <p className="num text-lg font-semibold">{inr(p.mrp)}</p>
            <p className="num text-[12px] font-semibold text-navy-900">{marginOf(p)}% reseller margin</p>
          </div>
        </div>

        {/* Tier table */}
        <table className="mt-4 w-full text-[13px]">
          <caption className="mb-2 text-left text-[12px] text-navy-900/55">
            Per-piece price by total pieces on your order (all styles combined)
          </caption>
          <tbody>
            {tiers.map((t) => (
              <tr key={t.label} className="border-b border-line last:border-0">
                <td className="py-1.5">{t.label}</td>
                <td className="num py-1.5 text-navy-900/60">
                  {t.max === Infinity ? `${t.min}+ pcs` : `${t.min || 1}–${t.max} pcs`}
                </td>
                <td className="num py-1.5 text-right font-semibold">{inr(p.price * (1 - t.off))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Order builder */}
        <div className="mt-6 border border-line bg-ivory-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Quantity</p>
            <div className="inline-flex rounded-sm border border-line p-0.5 text-[12px] font-semibold" role="tablist">
              {[
                ['pack', 'By pack'],
                ['split', 'Size by size']
              ].map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={mode === k}
                  onClick={() => setMode(k)}
                  className={`rounded-sm px-3 py-1.5 ${mode === k ? 'bg-navy-900 text-ivory-100' : 'text-navy-900/70'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {mode === 'pack' ? (
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <QtyStepper value={packs} onChange={setPacks} label="packs" />
                <p className="text-sm text-navy-900/70">
                  packs × {pack} pcs <span className="text-navy-900/45">({run.join(' · ')})</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="mb-2 text-[12px] text-navy-900/55">{sizeRunLabel[p.run]}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
                {run.map((s) => (
                  <label key={s} className="flex items-center justify-between gap-2">
                    <span className="num w-9 text-sm font-semibold">{s}</span>
                    <QtyStepper size="sm" value={draft[s] ?? 0} onChange={(n) => setSize(s, n)} label={`size ${s}`} />
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3 text-sm">
            <span className="num text-navy-900/70">{pieces} pieces</span>
            <span className="num text-lg font-bold">{inr(pieces * p.price)}</span>
          </div>

          {pieces > 0 && pieces < pack && (
            <p className="mt-2 flex items-start gap-2 text-[12px] text-navy-900/75">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-gold-dark" />
              Minimum for this style is {pack} pieces. Add {pack - pieces} more, in any sizes.
            </p>
          )}

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" className="btn btn-primary" disabled={!changed} onClick={() => commit(false)}>
              {inOrder ? (pieces ? 'Update order sheet' : 'Remove from order') : 'Add to order sheet'}
            </button>
            <button type="button" className="btn btn-outline" disabled={!pieces} onClick={() => commit(true)}>
              Save & review order
            </button>
          </div>
        </div>

        {/* Specs */}
        <dl className="mt-7 grid grid-cols-[120px_1fr] gap-y-2.5 text-[13px]">
          {[
            ['Fabric', p.fabric],
            ['Weight', `${p.gsm} GSM`],
            ['Opacity', p.opacity],
            ['Lining', p.lining],
            ['Sizes', `${run.join(', ')} (${sizeRunLabel[p.run].toLowerCase()})`],
            ['Construction', p.details],
            ['Suits', p.occasions.join(', ')],
            ['Dispatch', p.dispatch === 'Ready stock' ? 'Ready stock — 3–5 working days' : 'Made to order — 12–15 days']
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-navy-900/55">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <a
          href={whatsappLink(sampleMsg)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold underline underline-offset-4"
        >
          <MessageCircle size={15} /> Buy one sample piece first
        </a>
      </div>
    </div>
  )
}
