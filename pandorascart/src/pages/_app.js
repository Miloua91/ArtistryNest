import '../styles/globals.css'
import Layout from "@/pages/layout"
import { Toaster } from 'sonner'



export default function MyApp({ Component, pageProps }) {
    return <Layout>
      <Toaster position="bottom-center"/>
      <Component {...pageProps} />
      </Layout>
  }
