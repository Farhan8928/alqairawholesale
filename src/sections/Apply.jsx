import { useState } from 'react'
import { Check, MessageCircle } from 'lucide-react'
import { buyerTypes, contact } from '../data/business.js'
import { categories } from '../data/categories.js'
import { whatsappLink } from '../context/OrderContext.jsx'

// 2-digit state code · 10-char PAN · entity digit · Z · checksum
const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
const PHONE_RE = /^[+\d][\d\s-]{8,15}$/

const volumes = ['Under 100 pieces', '100–300 pieces', '300–1,000 pieces', '1,000+ pieces']

const empty = { name: '', business: '', phone: '', city: '', type: '', gstin: '', volume: '', ranges: [], note: '' }

/**
 * Trade account application. There is no backend: a valid form becomes a
 * formatted WhatsApp message to the wholesale desk. Swap `submit` for an API
 * call when one exists — the validation stays.
 */
export default function Apply({ standalone = false }) {
  const [f, setF] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }))
  const toggleRange = (key) =>
    setF((prev) => ({
      ...prev,
      ranges: prev.ranges.includes(key) ? prev.ranges.filter((r) => r !== key) : [...prev.ranges, key]
    }))

  function validate() {
    const e = {}
    if (!f.name.trim()) e.name = 'Your name, please.'
    if (!f.business.trim()) e.business = 'The name on your shop or invoice.'
    if (!PHONE_RE.test(f.phone.trim())) e.phone = 'A mobile number we can WhatsApp.'
    if (!f.city.trim()) e.city = 'Where should we ship?'
    if (!f.type) e.type = 'Pick the closest match.'
    if (f.gstin && !GSTIN_RE.test(f.gstin.trim())) e.gstin = 'That is not a valid 15-character GSTIN. Leave blank if unregistered.'
    return e
  }

  function submit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`apply-${Object.keys(e)[0]}`)?.focus()
      return
    }
    const rangeNames = categories.filter((c) => f.ranges.includes(c.key)).map((c) => c.name)
    const msg = [
      '*Trade account application — ALQAIRA Wholesale*',
      '',
      `Name: ${f.name}`,
      `Business: ${f.business}`,
      `Phone: ${f.phone}`,
      `City: ${f.city}`,
      `Buyer type: ${f.type}`,
      `GSTIN: ${f.gstin || 'Not registered'}`,
      f.volume && `Expected monthly volume: ${f.volume}`,
      rangeNames.length && `Interested in: ${rangeNames.join(', ')}`,
      f.note && `Note: ${f.note}`
    ]
      .filter(Boolean)
      .join('\n')
    window.open(whatsappLink(msg), '_blank', 'noopener')
    setSent(true)
  }

  const err = (k) =>
    errors[k] && (
      <p id={`apply-${k}-err`} className="mt-1.5 text-[12px] font-medium text-[#9B2C2C]">
        {errors[k]}
      </p>
    )
  const aria = (k) => ({ id: `apply-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `apply-${k}-err` : undefined })

  return (
    <section id="apply" className={`scroll-mt-16 border-t border-line bg-ivory-50 ${standalone ? 'py-14 sm:py-20' : 'py-20 sm:py-28'}`}>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {standalone ? (
            <h1 className="display text-4xl sm:text-5xl">Open a trade account</h1>
          ) : (
            <h2 className="display text-4xl sm:text-5xl">Open a trade account</h2>
          )}
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-900/70">
            You can order without one. An account gets you the PDF price list and a first look at new styles, and
            puts your GST details on file so every proforma comes back ready to pay.
          </p>
          <ul className="mt-8 space-y-3 text-[14px]">
            {['Reply within one working day', 'No fee, no annual commitment', 'GST registration optional'].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Check size={16} className="shrink-0" /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[13px] text-navy-900/60">
            Prefer to call? <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="num font-semibold text-navy-900 underline underline-offset-4">{contact.phone}</a>
          </p>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="border border-line bg-ivory-100 p-8">
              <p className="display text-3xl">Application ready to send</p>
              <p className="mt-3 max-w-md text-[15px] text-navy-900/70">
                WhatsApp opened in a new tab with your details filled in — press send there. If it did not open,
                message us on <span className="num font-semibold">{contact.phone}</span>.
              </p>
              <button type="button" onClick={() => { setF(empty); setSent(false) }} className="btn btn-outline mt-6">
                Start another application
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="apply-name" className="field-label">Your name</label>
                <input className="field" autoComplete="name" value={f.name} onChange={set('name')} {...aria('name')} />
                {err('name')}
              </div>
              <div>
                <label htmlFor="apply-business" className="field-label">Business name</label>
                <input className="field" autoComplete="organization" value={f.business} onChange={set('business')} {...aria('business')} />
                {err('business')}
              </div>
              <div>
                <label htmlFor="apply-phone" className="field-label">WhatsApp number</label>
                <input className="field num" type="tel" autoComplete="tel" placeholder="+91" value={f.phone} onChange={set('phone')} {...aria('phone')} />
                {err('phone')}
              </div>
              <div>
                <label htmlFor="apply-city" className="field-label">City</label>
                <input className="field" autoComplete="address-level2" value={f.city} onChange={set('city')} {...aria('city')} />
                {err('city')}
              </div>
              <div>
                <label htmlFor="apply-type" className="field-label">You are a…</label>
                <select className="field" value={f.type} onChange={set('type')} {...aria('type')}>
                  <option value="">Select</option>
                  {buyerTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {err('type')}
              </div>
              <div>
                <label htmlFor="apply-gstin" className="field-label">
                  GSTIN <span className="font-normal text-navy-900/50">(optional)</span>
                </label>
                <input
                  className="field num uppercase"
                  maxLength={15}
                  value={f.gstin}
                  onChange={(e) => setF((p) => ({ ...p, gstin: e.target.value.toUpperCase().trim() }))}
                  {...aria('gstin')}
                />
                {err('gstin')}
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="field-label">Expected monthly volume</legend>
                <div className="flex flex-wrap gap-2">
                  {volumes.map((v) => (
                    <label
                      key={v}
                      className={`cursor-pointer rounded-sm border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                        f.volume === v ? 'border-navy-900 bg-navy-900 text-ivory-100' : 'border-line bg-ivory-50 hover:border-navy-900/40'
                      }`}
                    >
                      <input type="radio" name="volume" value={v} checked={f.volume === v} onChange={set('volume')} className="sr-only" />
                      {v}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="sm:col-span-2">
                <legend className="field-label">Ranges you want to stock</legend>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const on = f.ranges.includes(c.key)
                    return (
                      <label
                        key={c.key}
                        className={`cursor-pointer rounded-sm border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                          on ? 'border-navy-900 bg-navy-900 text-ivory-100' : 'border-line bg-ivory-50 hover:border-navy-900/40'
                        }`}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggleRange(c.key)} className="sr-only" />
                        {c.name}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="apply-note" className="field-label">
                  Anything else <span className="font-normal text-navy-900/50">(optional)</span>
                </label>
                <textarea
                  id="apply-note"
                  rows={3}
                  className="field h-auto py-3"
                  placeholder="Shop size, where you sell, styles you are after…"
                  value={f.note}
                  onChange={set('note')}
                />
              </div>

              <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-primary">
                  <MessageCircle size={16} /> Send application
                </button>
                <p className="text-[12px] text-navy-900/55">Opens WhatsApp with your details filled in.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
