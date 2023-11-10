import Head from 'next/head'
import Hero from '@/pages/components/Hero'
import Brand from '@/pages/components/Brand'
import OurProducts from '@/pages/components/OurProducts'
import Esign from '@/pages/components/Esignup'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <Hero />
          <Brand />
          <OurProducts />
          <Esign />
        </div>
      </main>
    </>
  )
}
