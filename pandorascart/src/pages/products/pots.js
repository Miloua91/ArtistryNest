import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";

export default function Pots() {
  const pots = `/api/category?category=pots&search=*`;
  return (
    <>
      <Head>
        <title>Plant Pots | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"Plant pots"} apiEndpoint={pots} />
    </>
  );
}
