import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { products, marginOf } from '../data/products.js'
import { audiences, categories, occasions } from '../data/categories.js'

const sorts = {
  featured: { label: 'Line-sheet order', fn: null },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  margin: { label: 'Highest margin', fn: (a, b) => marginOf(b) - marginOf(a) }
}

/** Filters live in the URL so a buyer can share or bookmark a filtered view. */
export default function CataloguePage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = params.get('category') ?? ''
  const audience = params.get('audience') ?? ''
  const occasion = params.get('occasion') ?? ''
  const ready = params.get('ready') === '1'
  const q = params.get('q') ?? ''
  const sort = sorts[params.get('sort')] ? params.get('sort') : 'featured'

  useEffect(() => {
    document.title = 'Wholesale catalogue — ALQAIRA'
  }, [])

  const update = (k, v) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const out = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!audience || p.audience === audience) &&
        (!occasion || p.occasions.includes(occasion)) &&
        (!ready || p.dispatch === 'Ready stock') &&
        (!needle || `${p.code} ${p.name} ${p.colour} ${p.fabric}`.toLowerCase().includes(needle))
    )
    return sorts[sort].fn ? [...out].sort(sorts[sort].fn) : out
  }, [category, audience, occasion, ready, q, sort])

  const activeCount = [category, audience, occasion, ready].filter(Boolean).length
  const catName = categories.find((c) => c.key === category)?.name

  const Group = ({ title, name, options, value }) => (
    <fieldset className="border-b border-line py-5">
      <legend className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-900/55">{title}</legend>
      <div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-start lg:gap-0.5">
        {[['', 'All'], ...options].map(([v, label]) => {
          const on = value === v
          return (
            <button
              key={v || 'all'}
              type="button"
              onClick={() => update(name, v)}
              aria-pressed={on}
              className={`rounded-sm px-2.5 py-1.5 text-left text-[14px] transition-colors lg:px-2 lg:py-1 ${
                on ? 'bg-navy-900 text-ivory-100' : 'border border-line lg:border-transparent hover:bg-ivory-200'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )

  const filters = (
    <>
      <Group title="Range" name="category" value={category} options={categories.map((c) => [c.key, c.name])} />
      <Group title="For" name="audience" value={audience} options={audiences.map((a) => [a, a])} />
      <Group title="Occasion" name="occasion" value={occasion} options={occasions.map((o) => [o, o])} />
      <div className="py-5">
        <label className="flex cursor-pointer items-center gap-2.5 text-[14px]">
          <input
            type="checkbox"
            checked={ready}
            onChange={(e) => update('ready', e.target.checked ? '1' : '')}
            className="h-4 w-4 accent-[#16183A]"
          />
          Ready stock only
        </label>
      </div>
    </>
  )

  return (
    <div className="container-x pb-24 pt-10 sm:pt-14">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <h1 className="display text-4xl sm:text-5xl">{catName ?? 'Wholesale catalogue'}</h1>
          <p className="num mt-3 text-[15px] text-navy-900/65">
            {list.length} of {products.length} styles · prices per piece, before tier discount and GST
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          <label className="relative flex-1 sm:w-64 sm:flex-none">
            <span className="sr-only">Search by style code or name</span>
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-900/45" />
            <input
              type="search"
              placeholder="Style code or name"
              value={q}
              onChange={(e) => update('q', e.target.value)}
              className="field pl-9"
            />
          </label>
          <label className="sr-only" htmlFor="sort">Sort</label>
          <select id="sort" value={sort} onChange={(e) => update('sort', e.target.value === 'featured' ? '' : e.target.value)} className="field w-auto">
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => setFiltersOpen((v) => !v)} className="btn btn-outline lg:hidden" aria-expanded={filtersOpen}>
            <SlidersHorizontal size={16} /> Filters{activeCount ? ` (${activeCount})` : ''}
          </button>
        </div>
      </header>

      <div className="mt-2 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block`} aria-label="Filters">
          <div className="lg:sticky lg:top-20">{filters}</div>
        </aside>

        <div className="pt-6">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setParams(q ? { q } : {}, { replace: true })}
              className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold underline underline-offset-4"
            >
              <X size={14} /> Clear filters
            </button>
          )}

          {list.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 xl:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.code} product={p} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-line py-20 text-center">
              <p className="display text-2xl">No styles match</p>
              <p className="mt-2 text-sm text-navy-900/60">Try fewer filters, or ask us — not every style is online yet.</p>
              <button type="button" onClick={() => setParams({}, { replace: true })} className="btn btn-outline mt-6">
                Show all styles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
