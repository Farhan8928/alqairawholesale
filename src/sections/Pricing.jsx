import { useState } from 'react'
import TierMeter from '../components/TierMeter.jsx'
import { tiers, terms, tierFor, MIN_ORDER_VALUE } from '../data/business.js'
import { inr } from '../data/products.js'

// A thobe pack at a representative price, for the calculator's ₹ figure.
const AVG_PRICE = 700

export default function Pricing() {
  const [pieces, setPieces] = useState(120)
  const tier = tierFor(pieces)
  const gross = pieces * AVG_PRICE
  const saved = gross * tier.off

  return (
    <section id="pricing" className="grain scroll-mt-16 bg-navy-900 py-20 text-ivory-100 sm:py-24">
      <div className="container-x">
        <h2 className="display max-w-[18ch] text-4xl sm:text-5xl">The discount counts the whole order.</h2>
        <p className="mt-4 max-w-xl text-[15px] text-ivory-100/75">
          Tiers go by total pieces across every style and size — not per style. Mixing ranges never costs you a tier.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Tier table + calculator */}
          <div className="lg:col-span-7">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-ivory-100/20 text-[12px] uppercase tracking-[0.14em] text-ivory-100/55">
                  <th className="py-3 font-semibold">Tier</th>
                  <th className="py-3 font-semibold">Pieces on the order</th>
                  <th className="py-3 text-right font-semibold">Discount</th>
                </tr>
              </thead>
              <tbody className="num">
                {tiers.map((t) => (
                  <tr
                    key={t.label}
                    className={`border-b border-ivory-100/10 transition-colors ${t === tier ? 'bg-ivory-100/[0.06]' : ''}`}
                  >
                    <td className="py-4 pl-2 text-[15px] font-semibold">{t.label}</td>
                    <td className="py-4 text-ivory-100/75">{t.max === Infinity ? `${t.min} and above` : `${t.min || 1} – ${t.max}`}</td>
                    <td className={`py-4 pr-2 text-right text-lg font-bold ${t === tier ? 'text-gold-light' : ''}`}>
                      {t.off ? `${Math.round(t.off * 100)}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 border border-ivory-100/15 p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <label htmlFor="calc" className="text-sm font-semibold">
                  Try it — pieces on your order
                </label>
                <span className="display num text-3xl">{pieces}</span>
              </div>
              <input
                id="calc"
                type="range"
                min={5}
                max={600}
                step={5}
                value={pieces}
                onChange={(e) => setPieces(Number(e.target.value))}
                className="mt-4 w-full accent-[#C9A24B]"
              />
              <div className="mt-5">
                <TierMeter pieces={pieces} dark />
              </div>
              <p className="num mt-4 border-t border-ivory-100/15 pt-4 text-[13px] text-ivory-100/70">
                At an average {inr(AVG_PRICE)}/pc that is {inr(gross)} gross
                {saved > 0 ? (
                  <>
                    , <strong className="text-ivory-100">{inr(saved)} off</strong>
                  </>
                ) : (
                  ''
                )}
                .{gross < MIN_ORDER_VALUE && ` Below the ${inr(MIN_ORDER_VALUE)} minimum.`}
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory-100/55">Terms at a glance</p>
            <dl className="mt-4 divide-y divide-ivory-100/10 border-y border-ivory-100/10">
              {terms.map((t) => (
                <div key={t.k} className="grid grid-cols-[110px_1fr] gap-4 py-3.5 text-[14px]">
                  <dt className="font-semibold">{t.k}</dt>
                  <dd className="text-ivory-100/75">{t.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
