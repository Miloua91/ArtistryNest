import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";

export default function Tables() {
  const lamps = `/api/category?category=lamps&search=*`;
  return (
    <>
      <Head>
        <title>Lamps | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"Lamps"} apiEndpoint={lamps} />
    </>
  );
}
