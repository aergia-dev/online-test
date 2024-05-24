import Sidebar from './sidebar'

export default function AdminLayout({ children }) {
  return (
    <section>
         <div className="flex flex-row">
            <Sidebar />
            {children}
          </div>
    </section>
  )
}
