import Head from 'next/head'
import Header from '@/pages/components/Header'
import Footer from '@/pages/components/Footer'



 
export default function Layout({ children }) {
  return (
    <>
    <Head>
        <title>ArtistryNest</title>
        <meta name="description" content="Ecommerce site Miloua Mokhtar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}