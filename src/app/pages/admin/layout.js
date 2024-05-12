import Navbar from './navbar'

export default function AdminLayout({ children }) {
  return (
    <section>
      <div className="flex flex-col">
        <Navbar />
        {children}
      </div>
    </section >
  )
}
