import Navbar from './navbar'

export default function AdminLayout({children}) {
  return (
    <section>
        <Navbar/>
      {children}
    </section>
  )
}
