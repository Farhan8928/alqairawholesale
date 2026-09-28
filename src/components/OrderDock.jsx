import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useOrder } from '../context/OrderContext.jsx'
import { inr } from '../data/products.js'
import { contact } from '../data/business.js'

/**
 * Bottom-right dock. With an order in progress it is a running total that
 * opens the sheet; otherwise it is a direct line to the wholesale desk.
 */
export default function OrderDock() {
  const { summary, openSheet, sheetOpen, activeCode } = useOrder()
  if (sheetOpen || activeCode) return null

  return (
    <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {summary.pieces > 0 ? (
          <motion.button
            key="order"
            type="button"
            onClick={openSheet}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex items-center gap-4 rounded-sm bg-navy-900 py-3 pl-4 pr-3.5 text-left text-ivory-100 hover:bg-navy-700"
          >
            <span>
              <span className="num block text-[11px] text-ivory-100/65">
                {summary.pieces} pcs · {summary.tier.label}
                {summary.tier.off > 0 && ` −${Math.round(summary.tier.off * 100)}%`}
              </span>
              <span className="num block text-[15px] font-bold">{inr(summary.taxable)}</span>
            </span>
            <span className="flex items-center gap-1.5 border-l border-ivory-100/20 pl-4 text-[13px] font-semibold">
              Review <ArrowRight size={15} />
            </span>
          </motion.button>
        ) : (
          <motion.a
            key="wa"
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hi, I would like the wholesale price list.')}`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex items-center gap-2 rounded-sm bg-navy-900 px-4 py-3 text-[13px] font-semibold text-ivory-100 hover:bg-navy-700"
          >
            <MessageCircle size={16} /> Wholesale desk
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
