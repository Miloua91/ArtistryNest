import Head from "next/head";
import Hero from "@/pages/components/Hero";
import Brand from "@/pages/components/Brand";
import OurProducts from "@/pages/components/OurProducts";
import Esign from "@/pages/components/Esignup";

export default function Home() {
  return (
    <>
      <main>
        <div>
          <Hero />
          <Brand />
          <OurProducts />
          <Esign />
        </div>
      </main>
    </>
  );
}
