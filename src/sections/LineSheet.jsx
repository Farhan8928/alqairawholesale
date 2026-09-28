import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import { audiences } from '../data/categories.js'

export default function LineSheet() {
  const [aud, setAud] = useState('Men')
  const list = products.filter((p) => p.audience === aud).slice(0, 8)

  return (
    <section className="border-t border-line bg-ivory-50 py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="display text-4xl sm:text-5xl">The line sheet</h2>
            <p className="mt-3 max-w-lg text-[15px] text-navy-900/70">
              Wholesale price, printed MRP and your margin on every style. Add a pack straight from the grid.
            </p>
          </div>
          <div className="inline-flex rounded-sm border border-line bg-ivory-100 p-0.5 text-sm font-semibold" role="tablist">
            {audiences.map((a) => (
              <button
                key={a}
                type="button"
                role="tab"
                aria-selected={aud === a}
                onClick={() => setAud(a)}
                className={`rounded-sm px-4 py-2 ${aud === a ? 'bg-navy-900 text-ivory-100' : 'text-navy-900/70 hover:text-navy-900'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.code} product={p} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link to="/catalogue" className="btn btn-primary">
            Full catalogue <ArrowRight size={16} />
          </Link>
          <Link to="/quick-order" className="btn btn-outline">
            Order every style on one screen
          </Link>
        </div>
      </div>
    </section>
  )
}
