import '../styles/globals.css'
import Layout from "@/pages/layout"


export default function MyApp({ Component, pageProps }) {
    return <Layout>
      <Component {...pageProps} />
      </Layout>
  }
