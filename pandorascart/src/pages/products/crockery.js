import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";

export default function Crockery() {
  const crockery = `/api/category?category=crockery&search=*`;
  return (
    <>
      <Head>
        <title>Crockery | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"Crockery"} apiEndpoint={crockery} />
    </>
  );
}
