import Head from "next/head";
import Header from "@/pages/components/Header";
import Footer from "@/pages/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>ArtistryNest</title>
        <meta name="description" content="Ecommerce site Miloua Mokhtar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </SearchProvider>
      <Footer />
    </>
  );
}
