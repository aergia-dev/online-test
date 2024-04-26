import Navbar from './navbar'
import Sidebar from './sidebar'

export default function AdminLayout({ children }) {
  return (
    <section>
      <div className="flex flex-col">
        <Navbar />
        <div >
          <div className="flex flex-row">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </section >
  )
}
