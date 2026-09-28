import { Plus } from 'lucide-react'
import QtyStepper from './QtyStepper.jsx'
import { useOrder, runOf, packSize } from '../context/OrderContext.jsx'
import { inr, marginOf } from '../data/products.js'

export default function ProductCard({ product: p }) {
  const { lines, addPacks, openProduct } = useOrder()
  const run = runOf(p)
  const sizes = lines[p.code] ?? {}
  const pieces = Object.values(sizes).reduce((a, b) => a + b, 0)
  // Packs on the card = complete size sets in the line. A hand-edited split
  // that is not a whole set shows as 0 packs plus "Edit sizes".
  const packs = pieces ? Math.min(...run.map((s) => sizes[s] ?? 0)) : 0

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={() => openProduct(p.code)}
        className="relative block aspect-[4/5] overflow-hidden bg-ivory-200 text-left"
        aria-label={`View ${p.name} details and sizes`}
      >
        <img
          src={p.images[0]}
          alt={`${p.name} in ${p.colour}, front`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={p.images[1]}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="absolute left-2.5 top-2.5 rounded-sm bg-ivory-50/95 px-2 py-1 text-[11px] font-semibold">
          {p.dispatch}
        </span>
        {pieces > 0 && (
          <span className="num absolute right-2.5 top-2.5 rounded-sm bg-navy-900 px-2 py-1 text-[11px] font-semibold text-ivory-100">
            {pieces} pcs
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col pt-3.5">
        <p className="num text-[11px] font-semibold tracking-wider text-navy-900/50">{p.code}</p>
        <h3 className="mt-0.5 text-[15px] font-semibold leading-snug">
          <button type="button" onClick={() => openProduct(p.code)} className="text-left hover:underline underline-offset-4">
            {p.name}
          </button>
        </h3>
        <p className="mt-0.5 text-[13px] text-navy-900/60">
          {p.colour} · {p.fabric}
        </p>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 border-t border-line pt-3">
          <p>
            <span className="num text-lg font-bold">{inr(p.price)}</span>
            <span className="text-[12px] text-navy-900/55"> /pc</span>
          </p>
          <p className="num text-[12px] text-navy-900/60">
            MRP {inr(p.mrp)} · <span className="font-semibold text-navy-900">{marginOf(p)}% margin</span>
          </p>
        </div>
        <p className="mt-1 text-[12px] text-navy-900/55">
          Pack of {packSize(p)} · sizes {run[0]}–{run[run.length - 1]}
        </p>

        <div className="mt-auto pt-3.5">
          {packs > 0 ? (
            <div className="flex items-center gap-2">
              <QtyStepper size="sm" value={packs} label={`${p.name} packs`} onChange={(n) => addPacks(p.code, n - packs)} />
              <span className="text-[12px] text-navy-900/60">packs</span>
              <button
                type="button"
                onClick={() => openProduct(p.code)}
                className="ml-auto text-[13px] font-semibold underline underline-offset-4"
              >
                Edit sizes
              </button>
            </div>
          ) : pieces > 0 ? (
            <button type="button" onClick={() => openProduct(p.code)} className="btn btn-sm btn-outline w-full">
              Custom split · edit sizes
            </button>
          ) : (
            <button type="button" onClick={() => addPacks(p.code, 1)} className="btn btn-sm btn-outline w-full">
              <Plus size={15} /> Add 1 pack · {inr(p.price * packSize(p))}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
