import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardList, Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { useOrder } from '../context/OrderContext.jsx'
import { inr } from '../data/products.js'

const links = [
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/quick-order', label: 'Quick order' },
  { to: '/#pricing', label: 'Pricing & terms' },
  { to: '/#private-label', label: 'Private label' },
  { to: '/#faq', label: 'FAQ' }
]

export default function Nav() {
  const { summary, openSheet } = useOrder()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 bg-ivory-100/95 backdrop-saturate-150 transition-[border-color] ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[14px] font-medium">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `transition-colors hover:text-navy-900 ${
                      isActive && !l.to.includes('#') ? 'text-navy-900 underline underline-offset-[6px] decoration-gold decoration-2' : 'text-navy-900/70'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSheet}
            className="btn btn-sm btn-outline gap-2"
            aria-label={`Open order sheet, ${summary.pieces} pieces`}
          >
            <ClipboardList size={16} />
            <span className="hidden sm:inline">Order sheet</span>
            <span className="num rounded-sm bg-navy-900 px-1.5 py-0.5 text-[11px] leading-none text-ivory-100">
              {summary.pieces}
            </span>
            {summary.pieces > 0 && <span className="num hidden md:inline text-navy-900/60">{inr(summary.taxable)}</span>}
          </button>
          <Link to="/apply" className="btn btn-sm btn-primary hidden md:inline-flex">
            Open trade account
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-sm border border-navy-900/20"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-line bg-ivory-100"
          >
            <ul className="container-x py-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="block border-b border-line py-3.5 text-[15px] font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <Link to="/apply" className="btn btn-primary w-full">
                  Open trade account
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
