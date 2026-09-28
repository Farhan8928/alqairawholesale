import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { contact } from '../data/business.js'
import { categories } from '../data/categories.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="grain bg-navy-950 text-ivory-100/75">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Thobes, jubbas, kurta pajama, pathani suits and abayas, sold by the size-set pack to boutiques and
            resellers.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory-100">Range</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.key}>
                <Link to={`/catalogue?category=${c.key}`} className="hover:text-gold-light">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory-100">Buying</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/catalogue" className="hover:text-gold-light">Catalogue</Link></li>
            <li><Link to="/quick-order" className="hover:text-gold-light">Quick order</Link></li>
            <li><Link to="/#pricing" className="hover:text-gold-light">Pricing & terms</Link></li>
            <li><Link to="/#private-label" className="hover:text-gold-light">Private label</Link></li>
            <li><Link to="/apply" className="hover:text-gold-light">Trade account</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory-100">Wholesale desk</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="num hover:text-gold-light">{contact.phone}</a>
            </li>
            <li>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-gold-light">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-gold-light">{contact.email}</a>
            </li>
            <li className="text-ivory-100/55">{contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory-100/10">
        <div className="container-x flex flex-col gap-2 py-5 text-[12px] text-ivory-100/50 sm:flex-row sm:justify-between">
          <p>© {year} {contact.brand}. Trade and wholesale supply only.</p>
          <p>Prices exclude GST and freight.</p>
        </div>
      </div>
    </footer>
  )
}
