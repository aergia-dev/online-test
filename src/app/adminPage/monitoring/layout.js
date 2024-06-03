import Sidebar from './sidebar'
import Script from 'next/script'

export default function AdminLayout({ children }) {
  return (
    <section>
      {/* <Script src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js' */}
      <Script src='https://cdn.jsdelivr.net/npm/mathjax-full@3.2.2/es5/tex-mml-svg.min.js'
        strategy='beforeInteractive' />

      <div className="flex flex-row">
        <Sidebar />
        {children}
      </div>
    </section>
  )
}
