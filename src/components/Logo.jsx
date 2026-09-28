import { Link } from 'react-router-dom'

export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" aria-label="ALQAIRA Wholesale — home" className={`flex items-center gap-3 ${className}`}>
      <img src="/alqaira-wordmark.png" alt="ALQAIRA" width="634" height="113" className="h-5 sm:h-6 w-auto" />
      <span
        className={`border-l pl-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] ${
          light ? 'border-ivory-100/25 text-ivory-100/75' : 'border-navy-900/20 text-navy-900/65'
        }`}
      >
        Wholesale
      </span>
    </Link>
  )
}
