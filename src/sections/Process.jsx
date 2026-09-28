const steps = [
  {
    t: 'Build the order here',
    d: 'Add styles by the pack, or split sizes yourself. The sheet shows your tier, discount and GST as you go.'
  },
  {
    t: 'Send it on WhatsApp',
    d: 'One tap sends the full order, size by size. We check stock and reply with a proforma invoice the same working day.'
  },
  {
    t: 'Pay 50% to confirm',
    d: 'UPI, NEFT or RTGS to the account on the proforma. Ready-stock styles are packed as soon as it lands.'
  },
  {
    t: 'Balance, then dispatch',
    d: 'Pay the balance against packed-carton photos. We ship by your transporter or courier with a GST invoice and LR copy.'
  }
]

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display text-4xl sm:text-5xl">How an order moves</h2>
          <p className="mt-4 max-w-sm text-[15px] text-navy-900/70">
            No login, no payment gateway. The site builds the order; a person on our wholesale desk confirms it.
          </p>
        </div>

        <ol className="lg:col-span-8">
          {steps.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[56px_1fr] gap-4 border-t border-line py-7 last:border-b sm:grid-cols-[88px_1fr]">
              <span className="display num text-3xl text-navy-900/30 sm:text-4xl">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-navy-900/70">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
