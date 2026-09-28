import { Minus, Plus } from 'lucide-react'

/**
 * Number input flanked by −/+ buttons. `step` moves the buttons; typing
 * accepts any whole number so a buyer can key in "37" directly.
 */
export default function QtyStepper({ value, onChange, step = 1, min = 0, label, size = 'md', className = '' }) {
  const h = size === 'sm' ? 'h-8' : 'h-10'
  const w = size === 'sm' ? 'w-8' : 'w-10'
  return (
    <div className={`inline-flex items-stretch rounded-sm border border-line bg-white ${h} ${className}`}>
      <button
        type="button"
        aria-label={`Decrease ${label ?? 'quantity'}`}
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        className={`grid ${w} place-items-center text-navy-900/70 hover:bg-ivory-200 disabled:opacity-30`}
      >
        <Minus size={14} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        value={value === 0 ? '' : value}
        placeholder="0"
        aria-label={label ?? 'Quantity'}
        onChange={(e) => onChange(Math.max(min, Math.floor(Number(e.target.value) || 0)))}
        onFocus={(e) => e.target.select()}
        className="num w-12 border-x border-line bg-transparent text-center text-sm font-semibold outline-none focus:bg-ivory-50"
      />
      <button
        type="button"
        aria-label={`Increase ${label ?? 'quantity'}`}
        onClick={() => onChange(value + step)}
        className={`grid ${w} place-items-center text-navy-900/70 hover:bg-ivory-200`}
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
