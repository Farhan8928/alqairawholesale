import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Download, MessageCircle, Trash2 } from 'lucide-react'
import Drawer from './Drawer.jsx'
import TierMeter from './TierMeter.jsx'
import { useOrder, runOf, packSize, orderMessage, whatsappLink, downloadCsv } from '../context/OrderContext.jsx'
import { inr } from '../data/products.js'
import { GST_RATE, MIN_ORDER_VALUE } from '../data/business.js'

const BUYER_KEY = 'aq-wholesale-buyer-v1'

function loadBuyer() {
  try {
    return JSON.parse(localStorage.getItem(BUYER_KEY)) ?? {}
  } catch {
    return {}
  }
}

export default function OrderSheet() {
  const { summary, sheetOpen, closeSheet, openProduct, removeLine, clear } = useOrder()
  const [buyer, setBuyer] = useState(loadBuyer)

  useEffect(() => {
    try {
      localStorage.setItem(BUYER_KEY, JSON.stringify(buyer))
    } catch {
      /* ignore */
    }
  }, [buyer])

  const empty = summary.rows.length === 0
  const blocked = summary.shortBy > 0 || summary.moqIssues > 0

  const footer = empty ? null : (
    <div>
      {blocked && (
        <p className="mb-3 flex items-start gap-2 text-[12px] text-navy-900/80">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-gold-dark" />
          {summary.shortBy > 0
            ? `Add ${inr(summary.shortBy)} more to reach the ${inr(MIN_ORDER_VALUE)} minimum.`
            : `${summary.moqIssues} style${summary.moqIssues > 1 ? 's are' : ' is'} below one pack. Fix or remove to send.`}
        </p>
      )}
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <a
          href={blocked ? undefined : whatsappLink(orderMessage(summary, buyer))}
          target="_blank"
          rel="noreferrer"
          aria-disabled={blocked}
          onClick={(e) => blocked && e.preventDefault()}
          className={`btn btn-primary ${blocked ? 'pointer-events-none opacity-40' : ''}`}
        >
          <MessageCircle size={16} /> Send order on WhatsApp
        </a>
        <button type="button" onClick={() => downloadCsv(summary)} className="btn btn-outline">
          <Download size={16} /> CSV
        </button>
      </div>
      <p className="mt-2.5 text-center text-[11px] text-navy-900/55">
        Nothing is charged here. We reply with a proforma invoice and payment details.
      </p>
    </div>
  )

  return (
    <Drawer open={sheetOpen} onClose={closeSheet} title="Order sheet" width="max-w-[600px]" footer={footer}>
      {empty ? (
        <div className="px-6 py-16 text-center">
          <p className="display text-2xl">Your order sheet is empty</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-navy-900/65">
            Add styles by the pack from the catalogue, or key in quantities for every style at once on the quick order
            page.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link to="/catalogue" onClick={closeSheet} className="btn btn-primary">
              Browse catalogue
            </Link>
            <Link to="/quick-order" onClick={closeSheet} className="btn btn-outline">
              Quick order
            </Link>
          </div>
        </div>
      ) : (
        <div className="px-5 py-5">
          <div className="border border-line bg-ivory-50 p-4">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="text-sm font-semibold">
                {summary.tier.label} tier
                {summary.tier.off > 0 && <span className="num"> · {Math.round(summary.tier.off * 100)}% off</span>}
              </p>
              <p className="num text-[13px] text-navy-900/60">
                {summary.pieces} pcs · {summary.styles} styles
              </p>
            </div>
            <TierMeter pieces={summary.pieces} />
          </div>

          <ul className="mt-5 divide-y divide-line border-y border-line">
            {summary.rows.map((r) => (
              <li key={r.product.code} className="flex gap-3.5 py-4">
                <button type="button" onClick={() => openProduct(r.product.code)} className="h-24 w-[76px] shrink-0 overflow-hidden bg-ivory-200">
                  <img src={r.product.images[0]} alt="" className="h-full w-full object-cover" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="num text-[11px] font-semibold tracking-wider text-navy-900/50">{r.product.code}</p>
                      <p className="truncate text-sm font-semibold">{r.product.name}</p>
                      <p className="text-[12px] text-navy-900/55">{r.product.colour}</p>
                    </div>
                    <p className="num shrink-0 text-sm font-bold">{inr(r.value)}</p>
                  </div>
                  <p className="num mt-1.5 text-[12px] leading-relaxed text-navy-900/75">
                    {runOf(r.product)
                      .filter((s) => r.sizes[s])
                      .map((s) => `${s}×${r.sizes[s]}`)
                      .join('  ·  ')}
                  </p>
                  <div className="mt-1.5 flex items-center gap-4 text-[12px]">
                    <span className="num text-navy-900/60">
                      {r.pieces} pcs @ {inr(r.product.price)}
                    </span>
                    <button type="button" onClick={() => openProduct(r.product.code)} className="font-semibold underline underline-offset-4">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLine(r.product.code)}
                      className="inline-flex items-center gap-1 text-navy-900/60 hover:text-navy-900"
                      aria-label={`Remove ${r.product.name}`}
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                  {r.belowMoq && (
                    <p className="mt-1.5 text-[12px] font-medium text-gold-dark">
                      Below minimum — this style needs {packSize(r.product)} pcs.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <dl className="num mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-navy-900/65">Gross</dt>
              <dd>{inr(summary.gross)}</dd>
            </div>
            {summary.discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-navy-900/65">
                  {summary.tier.label} discount −{Math.round(summary.tier.off * 100)}%
                </dt>
                <dd>−{inr(summary.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-navy-900/65">Taxable value</dt>
              <dd>{inr(summary.taxable)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-navy-900/65">GST {Math.round(GST_RATE * 100)}%</dt>
              <dd>{inr(summary.gst)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-bold">
              <dt>Estimated total</dt>
              <dd>{inr(summary.total)}</dd>
            </div>
            <p className="text-[12px] font-normal text-navy-900/55">Freight is quoted separately once the order is packed.</p>
          </dl>

          <fieldset className="mt-7">
            <legend className="text-sm font-semibold">Your details (optional, sent with the order)</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                className="field"
                placeholder="Business name"
                value={buyer.name ?? ''}
                onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
              />
              <input
                className="field"
                placeholder="City"
                value={buyer.city ?? ''}
                onChange={(e) => setBuyer((b) => ({ ...b, city: e.target.value }))}
              />
              <input
                className="field sm:col-span-2 uppercase placeholder:normal-case"
                placeholder="GSTIN (if registered)"
                maxLength={15}
                value={buyer.gstin ?? ''}
                onChange={(e) => setBuyer((b) => ({ ...b, gstin: e.target.value.toUpperCase() }))}
              />
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => window.confirm('Clear every line from the order sheet?') && clear()}
            className="mt-6 text-[12px] font-semibold text-navy-900/55 underline underline-offset-4 hover:text-navy-900"
          >
            Clear order sheet
          </button>
        </div>
      )}
    </Drawer>
  )
}
