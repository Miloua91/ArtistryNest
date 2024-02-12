import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";

export default function Tables() {
  const tables = `/api/category?category=tables&search=*`;
  return (
    <>
      <Head>
        <title>Tables | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"Tables"} apiEndpoint={tables} />
    </>
  );
}
