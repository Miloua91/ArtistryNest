import Head from "next/head";
import Links from "@/pages/components/MenuLinks";

export default function All() {
  const all = `/api/products?search=`;
  return (
    <>
      <Head>
        <title>New arrivals | ArtistryNest</title>
      </Head>
      <Links pageHeader={"New arrivals"} apiEndpoint={all} />
    </>
  );
}
