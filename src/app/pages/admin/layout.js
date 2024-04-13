import Navbar from './navbar'

export default function AdminLayout({ children }) {
  return (
    <section>
      <div className="flex flex-col">
        <Navbar />
        <div >
          {children}
        </div>
      </div>
    </section >
  )
}
