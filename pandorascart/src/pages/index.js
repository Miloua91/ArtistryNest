import Head from 'next/head'
import Image from 'next/image'
import Hero from '@/pages/components/Hero'
import Brand from '@/pages/components/Brand'
import Header from '@/pages/components/Header'
import Footer from '@/pages/components/Footer'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Soug</title>
        <meta name="description" content="Ecommerce site Miloua Mokhtar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <Hero />
          <Brand />
        </div>
      </main>
    </>
  )
}
