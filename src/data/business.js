/**
 * Everything a buyer reads as a commercial promise lives in this file:
 * contact numbers, order minimum, volume tiers, payment and dispatch terms.
 *
 * ⚠️ Apart from the phone number, every value below is a PLACEHOLDER agreed
 * with nobody. Confirm each line with the client before this goes live — a wholesale buyer will hold you to a printed
 * minimum or discount, and a wrong one here is a dispute, not a typo.
 */

export const contact = {
  brand: 'ALQAIRA',
  phone: '+91 761 809 4118',
  // Digits only, with country code — used to build wa.me links.
  whatsapp: '917618094118',
  email: 'wholesale@alqaira.com',
  city: 'India',
  hours: 'Mon–Sat · 10:00–19:00 IST'
}

/** Smallest order we will invoice, before GST. */
export const MIN_ORDER_VALUE = 15000

/** GST on apparel in this price band. Confirm with the client's CA. */
export const GST_RATE = 0.05

/**
 * Volume tiers apply to the TOTAL pieces on one order, across all styles.
 * A buyer mixing 10 styles still reaches a tier — that is what boutiques want.
 */
export const tiers = [
  { min: 0, max: 49, off: 0, label: 'Starter', note: 'List wholesale price' },
  { min: 50, max: 149, off: 0.05, label: 'Boutique', note: '5% off the whole order' },
  { min: 150, max: 399, off: 0.1, label: 'Store', note: '10% off the whole order' },
  { min: 400, max: Infinity, off: 0.15, label: 'Distributor', note: '15% off, or ask for a quote' }
]

export function tierFor(pieces) {
  return tiers.find((t) => pieces >= t.min && pieces <= t.max) ?? tiers[0]
}

export function nextTier(pieces) {
  return tiers.find((t) => t.min > pieces) ?? null
}

/** Shown on the home page and repeated in the order sheet. */
export const terms = [
  {
    k: 'Minimum order',
    v: `₹${MIN_ORDER_VALUE.toLocaleString('en-IN')} per order, mixed across any styles.`
  },
  { k: 'Per style', v: 'One size-set pack — one piece of every size in the run.' },
  { k: 'Payment', v: '50% advance to confirm, balance before dispatch. UPI, NEFT or RTGS.' },
  { k: 'Dispatch', v: 'Ready stock in 3–5 working days. Made-to-order styles in 12–15 days.' },
  { k: 'Shipping', v: 'Transport or courier of your choice, at actuals. GCC by air or sea cargo.' },
  { k: 'Invoice', v: 'GST tax invoice on every order. Claim input credit if you are registered.' },
  { k: 'Returns', v: 'Manufacturing defects only, reported with photos within 7 days of delivery.' },
  { k: 'Samples', v: 'Buy any single piece at wholesale price + courier before you commit.' }
]

export const buyerTypes = [
  'Boutique / retail store',
  'Online reseller (Instagram, website, marketplace)',
  'Umrah & Hajj gift store',
  'Distributor / exporter',
  'Madrasa or institution uniforms'
]
