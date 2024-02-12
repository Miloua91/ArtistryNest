import Head from "next/head";
import Header from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>ArtistryNest</title>
        <meta name="description" content="Ecommerce site Miloua Mokhtar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://i1.sndcdn.com/avatars-dtgHaUZPb1l7U5RX-ly3X3w-t500x500.jpg"
        />
        <meta name="theme-color" content="#22202e" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <SpeedInsights />
          <Analytics />
        </CartProvider>
      </SearchProvider>
      <Footer />
    </>
  );
}
