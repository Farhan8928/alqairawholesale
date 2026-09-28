import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { contact, MIN_ORDER_VALUE, tiers } from '../data/business.js'

const facts = [
  { v: `₹${MIN_ORDER_VALUE.toLocaleString('en-IN')}`, k: 'Minimum order, mixed across any styles' },
  { v: '1 pack', k: 'Minimum per style — one of every size' },
  { v: `${Math.round(tiers[tiers.length - 1].off * 100)}%`, k: 'Top volume discount, on the whole order' },
  { v: '3–5 days', k: 'Dispatch on ready-stock styles' }
]

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: d, ease: [0.2, 0.8, 0.2, 1] }
})

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-navy-950 text-ivory-100">
      {/* Photograph with a functional scrim so the copy on the left stays legible. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img src="/banners/slide-men.jpg" alt="" className="h-full w-full object-cover object-[75%_20%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0C0D22_0%,rgba(12,13,34,0.92)_38%,rgba(12,13,34,0.35)_70%,rgba(12,13,34,0.1)_100%)] max-md:bg-[linear-gradient(180deg,rgba(12,13,34,0.55)_0%,#0C0D22_70%)]" />
      </div>

      <div className="container-x pt-20 pb-10 sm:pt-28 lg:pt-32">
        <motion.p {...fade(0.05)} className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-light">
          Wholesale · Trade buyers only
        </motion.p>

        <motion.h1 {...fade(0.12)} className="display mt-5 max-w-[15ch] text-[clamp(2.4rem,6vw,4.6rem)]">
          Thobes, jubbas and kurtas, sold by the size-set pack.
        </motion.h1>

        <motion.p {...fade(0.2)} className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ivory-100/80 sm:text-[17px]">
          One pack is one piece in every length, 52 to 60. Mix as many styles as you like — the volume discount counts
          your whole order, and every order ships with a GST invoice.
        </motion.p>

        <motion.div {...fade(0.28)} className="mt-9 flex flex-wrap gap-3">
          <Link to="/catalogue" className="btn btn-gold">
            Browse the line sheet <ArrowRight size={16} />
          </Link>
          <a
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hi, please send me the wholesale price list PDF.')}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light"
          >
            <MessageCircle size={16} /> Price list on WhatsApp
          </a>
        </motion.div>

        <motion.dl
          {...fade(0.4)}
          className="mt-16 grid grid-cols-2 border-t border-ivory-100/15 sm:mt-24 lg:grid-cols-4"
        >
          {facts.map((f, i) => (
            <div
              key={f.k}
              className={[
                'border-ivory-100/15 py-6 pr-4',
                i % 2 ? 'border-l pl-5' : '',
                i === 2 ? 'lg:border-l lg:pl-5' : '',
                i > 1 ? 'border-t lg:border-t-0' : ''
              ].join(' ')}
            >
              <dt className="sr-only">{f.k}</dt>
              <dd>
                <span className="display num block text-3xl sm:text-4xl">{f.v}</span>
                <span className="mt-2 block text-[13px] leading-snug text-ivory-100/65">{f.k}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
