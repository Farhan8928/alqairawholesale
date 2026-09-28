import { MIN_ORDER_VALUE } from './business.js'

const min = '₹' + MIN_ORDER_VALUE.toLocaleString('en-IN')

export const faq = [
  {
    q: 'Do I need a GST number to buy?',
    a: `No. Registered buyers get a GST invoice with their GSTIN and can claim input credit. Unregistered buyers are billed as B2C — same prices, same ${min} minimum.`
  },
  {
    q: 'What exactly is a "pack"?',
    a: 'One piece of every size in that style’s run. A thobe pack is five pieces: lengths 52, 54, 56, 58 and 60. You can also split sizes yourself on any style — the only rule is that each style reaches at least one pack’s worth of pieces.'
  },
  {
    q: 'Can I mix styles to reach the minimum?',
    a: `Yes. The ${min} minimum and the volume discount both count your whole order, across every style and size.`
  },
  {
    q: 'Can I see the quality before a bulk order?',
    a: 'Buy any single piece as a sample at the wholesale price plus courier. If you then order the style in bulk within 30 days, we take the sample value off that invoice.'
  },
  {
    q: 'Do you do private label or custom colours?',
    a: 'Yes, from 100 pieces per design. Your woven label and swing tag, your choice of fabric colour from our mill’s shade card. Allow 25–30 days after the sample is approved.'
  },
  {
    q: 'Do you ship to the UAE, Saudi Arabia and the rest of the GCC?',
    a: 'Yes, by air cargo for small consignments and sea cargo for larger ones. We quote freight separately once your order is packed and weighed.'
  },
  {
    q: 'How do I place the order?',
    a: 'Build it on this site and send it to us on WhatsApp in one tap, or download it as a CSV for your purchase team. We reply with a proforma invoice and payment details.'
  }
]
