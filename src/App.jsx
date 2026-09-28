import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ProductDrawer from './components/ProductDrawer.jsx'
import OrderSheet from './components/OrderSheet.jsx'
import OrderDock from './components/OrderDock.jsx'
import HomePage from './pages/HomePage.jsx'
import CataloguePage from './pages/CataloguePage.jsx'
import QuickOrderPage from './pages/QuickOrderPage.jsx'
import ApplyPage from './pages/ApplyPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-ivory-100 text-navy-900">
      <ScrollToTop />
      <TopBar />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/quick-order" element={<QuickOrderPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ProductDrawer />
      <OrderSheet />
      <OrderDock />
    </div>
  )
}
