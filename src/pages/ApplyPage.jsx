import { useEffect } from 'react'
import Apply from '../sections/Apply.jsx'

export default function ApplyPage() {
  useEffect(() => {
    document.title = 'Open a trade account — ALQAIRA Wholesale'
  }, [])
  return <Apply standalone />
}
