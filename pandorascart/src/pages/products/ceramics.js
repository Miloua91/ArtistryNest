import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";

export default function Ceramics() {
  const ceramics = `/api/category?category=ceramics&search=*`;
  return (
    <>
      <Head>
        <title>Ceramics | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"Ceramics"} apiEndpoint={ceramics} />
    </>
  );
}
