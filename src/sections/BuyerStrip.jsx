import { buyerTypes } from '../data/business.js'

/** Who the terms are written for. Plain text, no logos we do not have. */
export default function BuyerStrip() {
  const items = [...buyerTypes, ...buyerTypes]
  return (
    <section aria-label="Who we supply" className="border-b border-line bg-ivory-50">
      <div className="container-x flex items-center gap-6 py-4">
        <p className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-900/55">Set up for</p>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="flex w-max animate-marquee gap-10 text-[14px] font-medium">
            {items.map((t, i) => (
              <li key={i} aria-hidden={i >= buyerTypes.length} className="flex shrink-0 items-center gap-10">
                {t}
                <span className="h-1 w-1 bg-gold" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
