import { useEffect } from 'react'
import Hero from '../sections/Hero.jsx'
import BuyerStrip from '../sections/BuyerStrip.jsx'
import Categories from '../sections/Categories.jsx'
import LineSheet from '../sections/LineSheet.jsx'
import Process from '../sections/Process.jsx'
import Pricing from '../sections/Pricing.jsx'
import PrivateLabel from '../sections/PrivateLabel.jsx'
import Faq from '../sections/Faq.jsx'
import Apply from '../sections/Apply.jsx'

export default function HomePage() {
  useEffect(() => {
    document.title = 'ALQAIRA Wholesale — Thobes, Jubbas, Kurtas & Abayas by the Pack'
  }, [])

  return (
    <>
      <Hero />
      <BuyerStrip />
      <Categories />
      <LineSheet />
      <Process />
      <Pricing />
      <PrivateLabel />
      <Faq />
      <Apply />
    </>
  )
}
