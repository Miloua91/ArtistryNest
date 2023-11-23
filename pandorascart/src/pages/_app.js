import '../styles/globals.css'
import Layout from "@/pages/layout"
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'sonner'



export default function MyApp({ Component, pageProps }) {
    return <Layout>
      <Toaster richColors closeButton position="bottom-center"/>
      <Component {...pageProps} />
      </Layout>
  }
