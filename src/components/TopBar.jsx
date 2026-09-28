import { contact, MIN_ORDER_VALUE } from '../data/business.js'

// Every item here is a checkable term, not a slogan.
const items = [
  'Trade buyers only',
  `Minimum order ₹${MIN_ORDER_VALUE.toLocaleString('en-IN')}`,
  'Volume discount up to 15%',
  'GST invoice on every order',
  'Ships across India & the GCC'
]

export default function TopBar() {
  return (
    <div className="bg-navy-950 text-ivory-100/80 text-[12px]">
      <div className="container-x flex h-9 items-center justify-between gap-6">
        <ul className="flex min-w-0 items-center gap-5 overflow-x-auto no-scrollbar">
          {items.map((t, i) => (
            <li key={t} className={`shrink-0 ${i > 1 ? 'hidden md:block' : ''}`}>
              {t}
            </li>
          ))}
        </ul>
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hidden shrink-0 sm:block hover:text-gold-light num">
          {contact.phone}
        </a>
      </div>
    </div>
  )
}
