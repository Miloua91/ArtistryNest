import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";

export default function Sofas() {
  const sofas = `/api/category?category=sofas&search=*`;
  return (
    <>
      <Head>
        <title>Sofas | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"Sofas"} apiEndpoint={sofas} />
    </>
  );
}
