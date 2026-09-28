import { tiers } from '../data/business.js'

/**
 * Four segments, one per volume tier, filled up to the buyer's current piece
 * count. The sentence underneath is the useful part: how many more pieces to
 * the next discount.
 */
export default function TierMeter({ pieces, dark = false }) {
  let current = 0
  tiers.forEach((t, i) => {
    if (pieces >= t.min) current = i
  })
  const next = tiers[current + 1]

  return (
    <div>
      <div className="grid grid-cols-4 gap-1">
        {tiers.map((t, i) => {
          const span = t.max === Infinity ? t.min : t.max + 1 - t.min
          const fill = i < current ? 1 : i === current ? Math.min(1, (pieces - t.min) / span) : 0
          return (
            <div key={t.label}>
              <div className={`h-1.5 overflow-hidden rounded-sm ${dark ? 'bg-ivory-100/15' : 'bg-navy-900/10'}`}>
                <div
                  className={`h-full transition-[width] duration-300 ${
                    i === current ? 'bg-gold' : dark ? 'bg-ivory-100/70' : 'bg-navy-900'
                  }`}
                  style={{ width: `${Math.max(i <= current ? 8 : 0, fill * 100)}%` }}
                />
              </div>
              <p
                className={`mt-1.5 text-[11px] leading-tight ${
                  i === current ? 'font-semibold' : dark ? 'text-ivory-100/55' : 'text-navy-900/50'
                }`}
              >
                {t.label}
                <span className="num block font-normal">{t.off ? `−${Math.round(t.off * 100)}%` : 'List'}</span>
              </p>
            </div>
          )
        })}
      </div>
      <p className={`mt-3 text-[13px] ${dark ? 'text-ivory-100/80' : 'text-navy-900/75'}`}>
        {next ? (
          <>
            Add <strong className="num">{next.min - pieces}</strong> more pieces for{' '}
            <strong>{Math.round(next.off * 100)}% off</strong> the whole order.
          </>
        ) : (
          <>Top tier reached. For 1,000+ pieces, ask us for a quote.</>
        )}
      </p>
    </div>
  )
}
