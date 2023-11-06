import Header from '@/pages/components/Header'
import Footer from '@/pages/components/Footer'

 
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}