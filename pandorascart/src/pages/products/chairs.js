import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";

export default function Chairs() {
  const chairs = `/api/category?category=chairs&search=*`;
  return (
    <>
      <Head>
        <title>Chairs | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"Chairs"} apiEndpoint={chairs} />
    </>
  );
}
