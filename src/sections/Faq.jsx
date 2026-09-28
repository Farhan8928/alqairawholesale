import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faq } from '../data/faq.js'
import { contact } from '../data/business.js'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="scroll-mt-16 py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display text-4xl sm:text-5xl">Before you order</h2>
          <p className="mt-4 max-w-sm text-[15px] text-navy-900/70">
            Anything not answered here, the wholesale desk answers on{' '}
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
              WhatsApp
            </a>{' '}
            — {contact.hours}.
          </p>
        </div>

        <ul className="border-t border-line lg:col-span-8">
          {faq.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-semibold"
                  >
                    {f.q}
                    <Plus size={18} className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <p className="overflow-hidden pr-10 text-[15px] leading-relaxed text-navy-900/70">
                    <span className="block pb-6">{f.a}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
