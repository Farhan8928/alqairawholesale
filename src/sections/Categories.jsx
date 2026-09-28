import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/categories.js'
import { products, inr } from '../data/products.js'

const stats = Object.fromEntries(
  categories.map((c) => {
    const list = products.filter((p) => p.category === c.key)
    return [c.key, { count: list.length, from: Math.min(...list.map((p) => p.price)) }]
  })
)

export default function Categories() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display max-w-[20ch] text-4xl sm:text-5xl">Six ranges. One order.</h2>
          <p className="max-w-md text-[15px] text-navy-900/70">
            Every range counts toward the same minimum and the same volume tier, so a boutique can take two packs of
            thobes, one of abayas and three of kids and still hit a discount.
          </p>
        </div>

        {/* First tile is double-size: thobes are most of the line. The last
            runs full width so six tiles close the grid with no orphan. */}
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-2 sm:auto-rows-[260px] lg:grid-cols-4">
          {categories.map((c, i) => (
            <Link
              key={c.key}
              to={`/catalogue?category=${c.key}`}
              className={`group relative overflow-hidden bg-ivory-200 ${
                i === 0 ? 'col-span-2 row-span-2' : i === categories.length - 1 ? 'col-span-2 lg:col-span-4' : ''
              }`}
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(12,13,34,0.85))]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-ivory-100 sm:p-5">
                <div>
                  <p className={`display ${i === 0 ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>{c.name}</p>
                  <p className="num mt-1 text-[12px] text-ivory-100/75">
                    {stats[c.key].count} {stats[c.key].count === 1 ? 'style' : 'styles'} · from {inr(stats[c.key].from)}/pc
                  </p>
                  {i === 0 && <p className="mt-2 hidden max-w-xs text-sm text-ivory-100/80 sm:block">{c.blurb}</p>}
                </div>
                <ArrowUpRight size={20} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
