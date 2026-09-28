import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../context/OrderContext.jsx'

const spec = [
  ['Minimum', '100 pieces per design, across any sizes'],
  ['Branding', 'Your woven neck label, care label and swing tag'],
  ['Fabric', 'Any colour on our mill’s shade card; your own fabric on request'],
  ['Sample', 'One sealed sample for approval before we cut'],
  ['Lead time', '25–30 days after sample approval']
]

export default function PrivateLabel() {
  return (
    <section id="private-label" className="scroll-mt-16 border-b border-line bg-ivory-200">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] bg-ivory-300 lg:min-h-[640px]">
          <img
            src="/products/moroccan-4.jpg"
            alt="Close-up of gold zari embroidery on an ivory jubba"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
          <h2 className="display max-w-[16ch] text-4xl sm:text-5xl">Your label, our stitching.</h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-navy-900/75">
            Selling under your own brand? Any style in the line sheet can be made with your label, in your colour.
            Tell us the style, quantity and colour and we send a costed sample.
          </p>

          <dl className="mt-9 max-w-lg divide-y divide-line border-y border-line">
            {spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3.5 text-[14px]">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-navy-900/75">{v}</dd>
              </div>
            ))}
          </dl>

          <a
            href={whatsappLink('Hi, I want to discuss private label manufacturing. Style / quantity / colour: ')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-9"
          >
            <MessageCircle size={16} /> Discuss private label
          </a>
        </div>
      </div>
    </section>
  )
}
