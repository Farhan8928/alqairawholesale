import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="container-x py-28 text-center">
      <p className="num text-[13px] font-semibold text-navy-900/50">404</p>
      <h1 className="display mt-3 text-4xl sm:text-5xl">That page is not on the line sheet</h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/catalogue" className="btn btn-primary">Browse catalogue</Link>
        <Link to="/" className="btn btn-outline">Home</Link>
      </div>
    </section>
  )
}
